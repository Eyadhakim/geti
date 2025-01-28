import { MultiLangString } from "@/interfaces/MultiLangString";
import prisma from "@/lib/prisma";
import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import { join } from "path";

export const PATCH = async (req: NextRequest, { params }: { params: Promise<{ key: string }> }) => {
  const { key } = await params;
  const data = await req.formData();
  const formName = data.get("name");
  const formPdf = data.get("pdf");

  try {
    if (!formName) return NextResponse.json({ message: "Invalid Data" }, { status: 400 });
    const pdfFile = formPdf as File;
    const fileName = pdfFile?.name;
    const path = join(process.cwd(), "public", "certifications");
    if (formPdf) {
      const bytes = await pdfFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      await writeFile(join(path, fileName), buffer);
    }
    const name:MultiLangString = JSON.parse(formName as string);

    const arCertificate = await prisma.certification.findFirst({
      where: {
        key,
        lang: "ar"
      }
    });

    const enCertificate = await prisma.certification.findFirst({
      where: {
        key,
        lang: "en"
      }
    });

    if (!arCertificate || !enCertificate)
      return NextResponse.json({ message: "Invalid Data" }, { status: 400 });

    await prisma.certification.update({
      data: {
        name: name.en,
        pdf: formPdf? `/certifications/${fileName}`: undefined
      },
      where: {
        id: enCertificate.id
      }
    }).then(async () => {
      await prisma.certification.update({
        data: {
          name: name.ar,
          pdf: formPdf? `/certifications/${fileName}`: undefined
        },
        where: {
          id: arCertificate.id
        }
      })
    }).then(async () => {
      await prisma.$disconnect();
    });

    return NextResponse.json({ message: "Success" }, { status: 200 })
  } catch {
    await prisma.$disconnect();
    return NextResponse.json({ message: "Server Error" }, { status: 500 })
  }

}

export const DELETE = async (req: NextRequest, { params }: { params: Promise<{ key: string }> }) => {
  const { key } = await params;

  try {
    await prisma.certification.deleteMany({
      where: {
        key
      }
    }).then(async () => {
      await prisma.$disconnect();
    });

    return NextResponse.json({ message: "Success" }, { status: 200 });
  } catch {
    await prisma.$disconnect();
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}