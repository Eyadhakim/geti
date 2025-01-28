import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const DELETE = async (req: Request, { params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  try {
    await prisma.client.delete({
      where: {
        id: Number(id)
      }
    }).then(async () => {
      await prisma.$disconnect();
    });

    return NextResponse.json({ message: "Success" }, { status: 200 })
  } catch (e) {
    console.log(e)
    return NextResponse.json({ message: "Server Error" }, { status: 500 })
  }
}