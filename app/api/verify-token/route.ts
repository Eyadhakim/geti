import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    if (!process.env.TOKEN_SECRET) throw Error("Server Error")
    const cookieToken = req.cookies.get("token")?.value;
    const token = crypto
      .createHmac("sha256", process.env.TOKEN_SECRET)
      .update(`${process.env.ADMIN_EMAIL}${Math.floor(Date.now() / (24 * 60 * 60 * 1000))}`)
      .digest("hex");

    if (token === cookieToken) return NextResponse.json({ message: "Valid token" }, { status: 200 });
    return NextResponse.json({ message: "Invalid Token" }, { status: 401 });
  } catch {
    return NextResponse.json({ message: "Server Error" }, { status: 500 })
  }
}