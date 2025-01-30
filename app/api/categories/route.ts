import { MultiLangString } from "@/interfaces/MultiLangString";
import prisma from "@/lib/prisma";
import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import { join } from "path";

export const POST = async (req: NextRequest) => {
  const data = await req.formData();

  const image = data.get("image") as File;
  const formName = data.get("name");
  const formDescription = data.get("description");

  try {
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const fileName = image.name;
    const path = join(process.cwd(), "public", "images", fileName);
    await writeFile(path, buffer);

    const name:MultiLangString = JSON.parse(formName as string);
    const description:MultiLangString = JSON.parse(formDescription as string);

    await prisma.category.createMany({
      data: [
        {
          name: name.ar,
          description: description.ar,
          image: `/images/${fileName}`,
          key: name.en,
          lang: "ar"
        },
        {
          name: name.en,
          description: description.en,
          image: `/images/${fileName}`,
          key: name.en,
          lang: "en"
        }
      ]
    });
  
      
    await prisma.$disconnect();
    return NextResponse.json({ message: "Success" }, { status: 200 });
  } catch (e) {
    await prisma.$disconnect();
    console.log(e)
    return NextResponse.json({ message: "Server Error" }, { status: 500 })
  }
}

export const GET = async (req: NextRequest) => {
  const locale = req.cookies.get("NEXT_LOCALE")?.value;

  try {
    const categories = await prisma.category.findMany({
      where: {
        lang: locale,
      }
    });
    return NextResponse.json(categories, { status: 200 });
  } catch {
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}