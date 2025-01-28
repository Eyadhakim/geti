import { MultiLangString } from "@/interfaces/MultiLangString";
import prisma from "@/lib/prisma";
import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import { join } from "path";

export const GET = async (req: NextRequest, { params }: { params: Promise<{ key: string }> }) => {
  const { key } = await params;
  const locale = req.cookies.get("NEXT_LOCALE")?.value;
  
  try {
    const isAdmin = req.headers.get('referer')?.includes("/admin/dashboard");
    if (isAdmin) {
      const posts = await prisma.post.findMany({
        where: {
          key
        }
      })

      return NextResponse.json(posts, { status: 200 });
    } else {
      const post = await prisma.post.findFirst({
        where: {
          key,
          lang: locale
        }
      });
      return NextResponse.json(post, { status: 200 });
    }
  } catch {
    await prisma.$disconnect();
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}

export const PATCH = async (req: NextRequest, { params }: { params: Promise<{ key: string }> }) => {
  const { key } = await params;
  const data = await req.formData();
  const image = data.get("image");
  const formTitle = data.get("title");
  const formContent = data.get("content");


  try {
    if (!formTitle || !formContent) return NextResponse.json({ message: "Invalid Data" }, { status: 400 });
    const imageFile = image as File;
    const fileName = imageFile?.name;
    const path = join(process.cwd(), "public", "images");
    if (image) {
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      await writeFile(join(path, fileName), buffer);
    }

    const title:MultiLangString = JSON.parse(formTitle as string);
    const content:MultiLangString = JSON.parse(formContent as string);
    
    const arPost = await prisma.post.findFirst({
      where: {
        key,
        lang: "ar"
      }
    });

    const enPost = await prisma.post.findFirst({
      where: {
        key,
        lang: "en"
      }
    });

    if (!arPost || !enPost) return NextResponse.json({ message: "Invalid Data" }, { status: 400 });
    
    await prisma.post.update({
      where: {
        id: arPost.id
      },
      data: {
        title: title.ar,
        content: content.ar,
        image: image ? `/images/${fileName}`: undefined,
        key: title.en,
      }
    }).then(async () => {
      await prisma.post.update({
        where: {
          id: enPost.id
        },
        data: {
          title: title.en,
          content: content.en,
          image: image ? `/images/${fileName}`: undefined,
          key: title.en,
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
    const arPost = await prisma.post.findFirst({
      where: {
        key,
        lang: "ar"
      }
    });

    const enPost = await prisma.post.findFirst({
      where: {
        key,
        lang: "en"
      }
    });

    await prisma.post.deleteMany({
      where: {
        OR: [
          { id: arPost?.id },
          { id: enPost?.id },
        ]
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