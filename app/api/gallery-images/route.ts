import prisma from "@/lib/prisma"
import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import { join } from "path";

export const GET = async () => {
  try {
    const images = await prisma.galleryImage.findMany();
    return NextResponse.json(images, { status: 200 });
  } catch {
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}

export const POST = async (req: NextRequest) => {
  try {
    const data = await req.formData();
    const images = data.getAll("images") as File[];
    if (images.length === 0)
    return NextResponse.json({ message: "Invalid data" }, { status: 400 });

    images.forEach(async image => {
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const path = join(process.cwd(), "public", "images", image.name);
      await writeFile(path, buffer);
      await prisma.galleryImage.create({
        data: {
          image: `/images/${image.name}`
        }
      });
    });


    await prisma.$disconnect();
    return NextResponse.json({ message: "Success" }, { status: 200 });
  } catch {
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}