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
      const services = await prisma.service.findMany({
        where: {
          key
        },
        include: {cards: true}
      })

      return NextResponse.json(services, { status: 200 });
    } else {
      const service = await prisma.service.findFirst({
        where: {
          key,
          lang: locale
        },
        include: {
          cards: { where: { lang: locale } }
        }
      });
      return NextResponse.json(service, { status: 200 });
    }
  } catch {
    await prisma.$disconnect();
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}

export const PATCH = async (req: NextRequest, { params }: { params: Promise<{ key: string }> }) => {
  const { key } = await params;
  const data = await req.formData();
  const formCards = data.getAll("cards");
  const images = data.getAll("images") as File[];
  const formTitle = data.get("title");
  const formDescription = data.get("description");
  const uploadedCards = data.getAll("uploadedCards");

  try {
    if ((!formCards && !uploadedCards) || !formTitle || !formDescription)
      return NextResponse.json({ message: "Invalid data" }, { status: 400 });

    
    const cards: {
      title: {
        ar: string,
        en: string
      },
      description: {
        ar: string,
        en: string
      },
      image: File | string
    }[] = uploadedCards.map(card => JSON.parse(card as string));

    formCards.forEach((card, index) => {
      cards.push({
        title: {
          ar: JSON.parse(card as string).title.ar,
          en: JSON.parse(card as string).title.en
        },
        description: {
          ar: JSON.parse(card as string).description.ar,
          en: JSON.parse(card as string).description.en
        },
        image: images[index]
      })
    });
    console.log(data, cards)

    const title: MultiLangString = JSON.parse(formTitle as string);
    const description: MultiLangString = JSON.parse(formDescription as string);

    const arService = await prisma.service.findFirst({
      where: {
        key,
        lang: "ar",
      },
      include: {cards: true}
    });

    const enService = await prisma.service.findFirst({
      where: {
        key,
        lang: "en"
      },
      include: {cards: true}
    });

    if (!enService || !arService) 
      return NextResponse.json({ message: "Invalid data" }, { status: 400 });
    

    await prisma.service.update({
      data: {
        key: title.en,
        title: title.en,
        description: description.en,
      },
      where: {
        id: enService.id
      }
    }).then(async () => {
      await prisma.service.update({
        data: {
          key: title.en,
          title: title.ar,
          description: description.ar,
        },
        where: {
          id: arService.id
        }
      })
    }).then(async () => {
      await prisma.card.deleteMany({
        where: {
          OR: [
            {
              serviceId: arService.id
            },
            {
              serviceId: enService.id
            }
          ]
        }
      })
    }).then(async () => {
      cards.forEach(async card => {
        let fileName;
        if (typeof(card.image) !== "string") {
          const bytes = await card.image.arrayBuffer();
          const buffer = Buffer.from(bytes);
          fileName = `/images/${card.image.name}`;
          const path = join(process.cwd(), "public", "images", card.image.name);
          await writeFile(path, buffer);
        } else {
          fileName = card.image;
        }
        await prisma.card.createMany({
          data: [
            {
              key: card.title.en,
              image: fileName,
              title: card.title.en,
              description: card.description.en,
              serviceId: enService.id,
              lang: "en"
            },
            {
              key: card.title.en,
              image: fileName,
              title: card.title.ar,
              description: card.description.ar,
              serviceId: arService.id,
              lang: "ar"
            }
          ]
        })
      });
    }).then(async () => {
      await prisma.$disconnect();
    })
    return NextResponse.json({ message: "Success" }, { status: 200 })
  } catch {
    await prisma.$disconnect();
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}

export const DELETE = async (req: NextRequest, { params }: { params: Promise<{ key: string }> }) => {
  const { key } = await params;

  try {
    await prisma.card.deleteMany({
      where: {
        OR: [
          {
            serviceId: (await prisma.service.findFirst({ where: { key, lang: "ar" } }))!.id
          },
          {
            serviceId: (await prisma.service.findFirst({ where: { key, lang: "en" } }))!.id
          }
        ]
      }
    }).then(async () => {
      await prisma.service.deleteMany({
        where: {
          key
        }
      })
    }).then(async () => {
      await prisma.$disconnect();
    })
    return NextResponse.json({ message: "Success" }, { status: 200 })
  } catch {
    await prisma.$disconnect();
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}