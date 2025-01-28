import { MultiLangString } from "@/interfaces/MultiLangString";
import prisma from "@/lib/prisma";
import { Category } from "@prisma/client";
import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import { join } from "path";

export const POST = async (req: NextRequest) => {
  const data = await req.formData();
  const productImages = data.getAll("images") as File[];
  const productTitle = data.get("title");
  const productDescription = data.get("description");
  const productCategory = data.get("category");
  const productImage360 = data.get("image360");

  try {
    if (productImages.length === 0 || !productTitle || !productDescription || !productCategory) {
      return NextResponse.json({ message: "Invalid data" }, { status: 400 });
    }
    
    const title:MultiLangString = JSON.parse(productTitle as string);
    const description:MultiLangString = JSON.parse(productDescription as string);
    const category = JSON.parse(productCategory as string) as Category;
    const image360 = productImage360 as File;
    const image360fileName = productImage360? image360.name: null;


    if (productImage360 && image360fileName) {
      const image = productImage360 as File;
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const path = join(process.cwd(), "public", "images", image360fileName);
      await writeFile(path, buffer);  
    }

    const arCategory = await prisma.category.findFirst({
      where: {
        key: category.key,
        lang: "ar"
      }
    });

    const enCategory = await prisma.category.findFirst({
      where: {
        key: category.key,
        lang: "en"
      }
    });
    
    const arProduct = await prisma.product.create({
      data: {
        key: title.en,
        title: title.en,
        description: description.en,
        image360: image360fileName? `/images/${image360fileName}`: undefined,
        categoryId: enCategory!.id,
        lang: "en"
      },
    });

    const enProduct = await prisma.product.create({
      data: {
        key: title.en,
        title: title.ar,
        description: description.ar,
        image360: image360fileName? `/images/${image360fileName}`: undefined,
        categoryId: arCategory!.id,
        lang: "ar"
      }
    });
    
    productImages.forEach(async (image) => {
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const fileName = image.name;
      const path = join(process.cwd(), "public", "images", fileName);
      await writeFile(path, buffer);
      await prisma.productImage.createMany({
        data: [
          {
            url: `/images/${fileName}`,
            productId: arProduct.id
          }, 
          {
            url: `/images/${fileName}`,
            productId: enProduct.id
          }
      ]
      }).then(async () => {
        await prisma.$disconnect();
      })
    });

    return NextResponse.json({ message: "success" }, { status: 200 })
  } catch {
    await prisma.$disconnect();
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}

export const GET = async (req: NextRequest) => {
  const locale = req.cookies.get("NEXT_LOCALE")?.value;
  const categoryKey = req.nextUrl.searchParams.get("category");

  try {
    let category: Category | null = null;
    if (categoryKey) {
      category = await prisma.category.findFirst({
        where: {
          lang: locale,
          key: categoryKey
        }
      })
    }

    const products = await prisma.product.findMany({
      where: {
        lang: locale,
        categoryId: category? category.id: undefined
      }
    });

    const images = await prisma.productImage.findMany();

    return NextResponse.json({ products, images }, { status: 200 });
  } catch {
    return NextResponse.json({ message: "Server Error" }, { status: 200 });
  }
}