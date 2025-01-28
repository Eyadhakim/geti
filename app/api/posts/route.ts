import { MultiLangString } from "@/interfaces/MultiLangString";
import prisma from "@/lib/prisma";
import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import { join } from "path";

export const GET = async (req: NextRequest) => {
  const locale = req.cookies.get("NEXT_LOCALE")?.value;

  try {
    const posts = await prisma.post.findMany({
      where: {
        lang: locale
      }
    });
    return NextResponse.json(posts, { status: 200 });
  } catch {
    await prisma.$disconnect();
    return NextResponse.json({ message: "Server Error" }, { status: 200 });
  }
}

export const POST = async (req: NextRequest) => {
  const data = await req.formData();
  const formImage = data.get("image");
  const formTitle = data.get("title");
  const formContent = data.get("content");
  
  try {
    if (!formImage || !formTitle || !formContent)
      return NextResponse.json({ message: "Invalid data" }, { status: 400 });
      
    const image = formImage as File;
    const title: MultiLangString = JSON.parse(formTitle as string);
    const content: MultiLangString = JSON.parse(formContent as string);
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const path = join(process.cwd(), "public", "images", image.name);
    await writeFile(path, buffer);  

    await prisma.post.createMany({
      data: [
        {
          key: title.en,
          title: title.en,
          content: content.en,
          image: `/images/${image.name}`,
          lang: "en"
        },
        {
          key: title.en,
          title: title.ar,
          content: content.ar,
          image: `/images/${image.name}`,
          lang: "ar"
        }
      ]
    }).then(async () => {
      await prisma.$disconnect();
    });

    return NextResponse.json({ message: "Success" }, { status: 200 });
  } catch {
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}