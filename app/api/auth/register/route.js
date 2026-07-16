import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
export async function POST(request) {
  try {
    await connectDB();
    const { name, email, password, gamertag } = await request.json();
    if (!name || !email || !password || !gamertag) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }
    const existingUser = await User.findOne({ $or: [{ email }, { gamertag }] });
    if (existingUser) {
      return NextResponse.json({ error: "Email or Gamertag already exists" }, { status: 400 });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      gamertag,
    });
    return NextResponse.json(
      { message: "User registered successfully", userId: newUser._id },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}