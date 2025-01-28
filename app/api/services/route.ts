import { MultiLangString } from "@/interfaces/MultiLangString";
import prisma from "@/lib/prisma";
import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import { join } from "path";

export const GET = async (req: NextRequest) => {
  const locale = req.cookies.get("NEXT_LOCALE")?.value;

  try {
    const services = await prisma.service.findMany({ where: { lang: locale }, include: { cards: { where: { lang: locale } } } });
    if (services) return NextResponse.json(services, { status: 200 });
    else return NextResponse.json({ message: "Not found" }, { status: 404 });
  } catch {
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}

export const POST = async (req: NextRequest) => {
  const data = await req.formData();
  const formCards = data.getAll("cards");
  const images = data.getAll("images") as File[];
  const formTitle = data.get("title");
  const formDescription = data.get("description");

  try {
    if (!formCards || !formTitle || !formDescription || images.length === 0) return NextResponse.json({ message: "Invalid data" }, { status: 400 }); 
    const title: MultiLangString = JSON.parse(formTitle as string);
    const description: MultiLangString = JSON.parse(formDescription as string);
    const cards: {
      title: {
        ar: string,
        en: string
      },
      description: {
        ar: string,
        en: string
      }
    }[] = formCards.map(card => JSON.parse(card as string));

    await prisma.service.createMany({
      data: [
        {
          key: title.en,
          title: title.en,
          description: description.en,
          lang: "en"
        },
        {
          key: title.en,
          title: title.ar,
          description: description.ar,
          lang: "ar"
        }
      ]
    }).then(async () => {
      cards.forEach(async (card, index) => {
          const image = images[index]; 
          const bytes = await image.arrayBuffer();
          const buffer = Buffer.from(bytes);
          const fileName = `/images/${image.name}`;
          const path = join(process.cwd(), "public", "images", image.name);
          await writeFile(path, buffer);

        await prisma.card.createMany({
          data: [
            {
              key: card.title.en,
              title: card.title.en,
              description: card.description.en,
              lang: "en",
              image: fileName,
              serviceId: (await prisma.service.findFirst({ where: { key: title.en, lang: "en" } }))!.id
            },
            {
              key: card.title.en,
              title: card.title.ar,
              description: card.description.ar,
              lang: "ar",
              image: fileName,
              serviceId: (await prisma.service.findFirst({ where: { key: title.en, lang: "ar" } }))!.id
            }
          ]
        });
      })
    }).then(async () => {
      await prisma.$disconnect();
    });
    return NextResponse.json({ message: "Success" }, { status: 200 });
  } catch {
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}