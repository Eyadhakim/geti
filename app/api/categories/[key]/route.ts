import { MultiLangString } from "@/interfaces/MultiLangString";
import prisma from "@/lib/prisma";
import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import { join } from "path";

export const GET = async (req: Request, { params }: { params: Promise<{ key: string }> }) => {
  const { key } = await params;
  try {
    if (!key) return NextResponse.json({ message: "Invalid data" }, { status: 404 })
    const data = await prisma.category.findMany({
      where: {
        key
      }
    });

    if (data) await prisma.$disconnect();
    return NextResponse.json(data, { status: 200 })
  } catch {
    await prisma.$disconnect();
    return NextResponse.json({ message: "Server Error" }, { status: 500 })
  }
}

export const PATCH = async (req: NextRequest, { params }: { params: Promise<{ key: string }> }) => {
  const { key } = await params;
  const data = await req.formData();
  const image = data.get("image");
  const formName = data.get("name");
  const formDescription = data.get("description");


  try {
    if (!formName || !formDescription) return NextResponse.json({ message: "Invalid Data" }, { status: 400 });
    const imageFile = image as File;
    const fileName = imageFile?.name;
    const path = join(process.cwd(), "public", "images");
    if (image) {
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      await writeFile(join(path, fileName), buffer);
    }

    const name:MultiLangString = JSON.parse(formName as string);
    const description:MultiLangString = JSON.parse(formDescription as string);
    
    const arCategory = await prisma.category.findFirst({
      where: {
        key,
        lang: "ar"
      }
    });

    const enCategory = await prisma.category.findFirst({
      where: {
        key,
        lang: "en"
      }
    });

    if (!arCategory || !enCategory) return NextResponse.json({ message: "Invalid Data" }, { status: 400 });
    
    await prisma.category.update({
      where: {
        id: arCategory.id
      },
      data: {
        name: name.ar,
        description: description.ar,
        image: image ? `/images/${fileName}`: undefined,
        key: name.en,
      }
    }).then(async () => {
      await prisma.category.update({
        where: {
          id: enCategory.id
        },
        data: {
          name: name.en,
          description: description.en,
          image: image ? `/images/${fileName}`: undefined,
          key: name.en,
        }
      });
    }).then(async () => {
      await prisma.$disconnect();
    });

    return NextResponse.json({ message: "Success" }, { status: 200 });
  } catch {
    await prisma.$disconnect();
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}

export const DELETE = async (req: Request, { params }: { params: Promise<{ key: string }> }) => {
  const { key } = await params;

  try {
    const arCategory = await prisma.category.findFirst({
      where: {
        key,
        lang: "ar"
      }
    });

    const enCategory = await prisma.category.findFirst({
      where: {
        key,
        lang: "en"
      }
    });

    const products = await prisma.product.findMany({
      where: {
        OR: [
          { categoryId: arCategory?.id },
          { categoryId: enCategory?.id },
        ]
      }
    });

    await prisma.productImage.deleteMany({
      where: {
        OR: products.map(p => ({ productId: p.id }))
      }
    }).then(async () => {
      await prisma.product.deleteMany({
        where: {
          OR: [
            { categoryId: arCategory?.id },
            { categoryId: enCategory?.id },
          ]
        }
      });
    }).then(async () => {
      await prisma.category.deleteMany({
        where: {
          key
        }
      });
    }).then(async () => {
      await prisma.$disconnect();
    });

    return NextResponse.json({ message: "Success" }, { status: 200 });
  } catch {
    await prisma.$disconnect();
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}