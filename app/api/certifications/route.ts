import { MultiLangString } from "@/interfaces/MultiLangString";
import prisma from "@/lib/prisma";
import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import { join } from "path";

export const GET = async (req: NextRequest) => {
  const locale = req.cookies.get("NEXT_LOCALE")?.value;

  try {
    const certificates = await prisma.certification.findMany({
      where: {
        lang: locale
      }
    });
    if (certificates) return NextResponse.json(certificates, { status: 200 });
    else return NextResponse.json({ message: "Not found" }, { status: 404 });
  } catch {
    await prisma.$disconnect();
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}

export const POST = async (req: NextRequest) => {
  const data = await req.formData();
  const formPdf = data.get("pdf");
  const formName = data.get("name");

  try {
    if (!formPdf || !formName)
      return NextResponse.json({ message: "Invalid data" }, { status: 400 });

    const pdf = formPdf as File;
    const bytes = await pdf.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const path = join(process.cwd(), "public", "certifications", pdf.name);
    await writeFile(path, buffer);
    const name:MultiLangString = JSON.parse(formName as string);

    await prisma.certification.createMany({
      data: [
        {
          key: name.en,
          name: name.en,
          pdf: `/certifications/${pdf.name}`,
          lang: "en"
        },
        {
          key: name.en,
          name: name.ar,
          pdf: `/certifications/${pdf.name}`,
          lang: "ar"
        }
      ]
    }).then(async () => {
      await prisma.$disconnect();
    })

    return NextResponse.json({ message: "Success" }, { status: 200 });
  } catch {
    await prisma.$disconnect();
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}