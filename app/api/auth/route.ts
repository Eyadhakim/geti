import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export const POST = async (req: NextRequest) => {
  const { email, password } = await req.json();

  try {
    if (!process.env.TOKEN_SECRET) throw Error("TOKEN_SECRET is not defined");

    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      const response = NextResponse.json({ message: "Login Successful" }, { status: 200 });
      const token = crypto
        .createHmac("sha256", process.env.TOKEN_SECRET)
        .update(`${email}${Math.floor(Date.now() / (24 * 60 * 60 * 1000))}`)
        .digest("hex");

      response.cookies.set("token", token, {
        httpOnly: true,
        path: "/",
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24
      });
      return response;
    }
  
    return NextResponse.json({ message: "Invalid Credentials" }, { status: 401 })
  } catch {
    return NextResponse.json({ message: "Server Error" }, { status: 500 })
  }
}