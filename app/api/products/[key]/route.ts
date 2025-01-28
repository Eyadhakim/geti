import { MultiLangString } from "@/interfaces/MultiLangString";
import prisma from "@/lib/prisma";
import { Category } from "@prisma/client";
import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import { join } from "path";

export const GET = async (req: NextRequest, { params }: { params: Promise<{ key: string }> }) => {
  const { key } = await params;
  const locale = req.cookies.get("NEXT_LOCALE")?.value;

  try {
    const products = await prisma.product.findMany({
      where: {
        key
      }
    });

    const images = await prisma.productImage.findMany({
      where: {
        productId: products[0].id
      }
    });

    const category = await prisma.category.findFirst({
      where: {
        id: locale === "ar"? products.find(product => product.lang === "ar")?.categoryId: products.find(product => product.lang === "en")?.categoryId
      }
    });
    if (products.length === 0 || images.length === 0 || !category) return NextResponse.json({ message: "Invalid data" }, { status: 400 })


    return NextResponse.json({ products, images, category }, { status: 200 });
  } catch {
    await prisma.$disconnect();
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}

export const PATCH = async (req: NextRequest, { params }: { params: Promise<{ key: string }> }) => {
  const { key } = await params;
  const data = await req.formData();
  const productImages = data.getAll("images") as File[];
  const uploadedImages = data.getAll("uploadedImages") as string[];
  const productTitle = data.get("title");
  const productDescription = data.get("description");
  const productCategory = data.get("category");
  const productImage360 = data.get("image360");
  const uploaded360ProductImage = data.get("uploadedImage360");

  try {
    if ((productImages.length === 0 && uploadedImages.length === 0) || ( productImage360 && uploaded360ProductImage ) || !productTitle || !productDescription || !productCategory) {
      return NextResponse.json({ message: "Invalid data" }, { status: 400 });
    }

    const title:MultiLangString = JSON.parse(productTitle as string);
    const description:MultiLangString = JSON.parse(productDescription as string);
    const category = JSON.parse(productCategory as string) as Category;
    const image360 = productImage360 as File;
    const image360fileName = productImage360? image360.name: null;
    const uploaded360Image = uploaded360ProductImage? uploaded360ProductImage as string: null;

    const arProduct = await prisma.product.findFirst({
      where: {
        key,
        lang: "ar"
      }
    });

    const enProduct = await prisma.product.findFirst({
      where: {
        key,
        lang: "en"
      }
    });

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


    if (!enProduct || !arProduct || !arCategory || !enCategory) 
      return NextResponse.json({ message: "Invalid data" }, { status: 400 });

    await prisma.productImage.deleteMany({
      where: {
        productId: arProduct.id,
      }
    }).then(async () => {
      await prisma.productImage.deleteMany({
        where: {
          productId: enProduct.id,
        }
      });
    });

    productImages.forEach(async image => {
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const fileName = image.name;
      const path = join(process.cwd(), "public", "images", fileName);
      await writeFile(path, buffer);
      await prisma.productImage.create({
        data: {
          url: `/images/${fileName}`,
          productId: arProduct.id
        }
      }).then(async () => {
        await prisma.productImage.create({
          data: {
            url: `/images/${fileName}`,
            productId: enProduct.id
          }
        })
      })
    });

    uploadedImages.forEach(async image => {
      await prisma.productImage.create({
        data: {
          url: image,
          productId: arProduct.id
        }
      }).then(async () => {
        await prisma.productImage.create({
          data: {
            url: image,
            productId: enProduct.id
          }
        })
      })
    })

    if (productImage360) {
      const bytes = await image360.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const path = join(process.cwd(), "public", "images", image360fileName!);
      await writeFile(path, buffer);
    }

    await prisma.product.update({
      data: {
        key: title.en,
        title: title.ar,
        description: description.ar,
        categoryId: arCategory.id,
        image360: image360fileName? `/images/${image360fileName}`: uploaded360Image,
      },
      where: {
        id: arProduct.id
      }
    }).then(async () => {
      await prisma.product.update({
        data: {
          key: title.en,
          title: title.en,
          description: description.en,
          categoryId: enCategory.id,
          image360: image360fileName? `/images/${image360fileName}`: uploaded360Image,
        },
        where: {
          id: enProduct.id
        }
      });
    }).then(async () => {
      await prisma.$disconnect();
    })

      return NextResponse.json({ message: "Success" }, { status: 200 });
  } catch {
    await prisma.$disconnect();
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}

export const DELETE = async (req: NextRequest, { params }: { params: Promise<{ key: string }> }) => {
  const { key } = await params;

  try {
    const products = await prisma.product.findMany({
      where: {
        key
      }
    });

    if (products.length === 0) return NextResponse.json({ message: "Invalid Data"}, { status: 400 });

    products.forEach(async (product) => {
      await prisma.productImage.deleteMany({
        where: {
          productId: product.id
        }
      });
    });

    await prisma.product.deleteMany({
      where: {
        key
      }
    }).then(async() => {
      await prisma.$disconnect();
    });

    return NextResponse.json({ message: "Success" }, { status: 200 })
  } catch {
    await prisma.$disconnect();
    return NextResponse.json({ message: "Server Error" }, { status: 500 })
  }
}