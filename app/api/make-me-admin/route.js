import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/models/User"; // Check that this path matches your User model location

export async function GET() {
  try {
    await connectDB();
    
    // ⚠️ IMPORTANT: Change this to the exact email you use to log in via Google
    const myEmail = "piiixxel108@gmail.com"; 

    const updatedUser = await User.findOneAndUpdate(
      { email: myEmail },
      { role: "Admin" },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json({ error: "User not found. Did you log in at least once?" });
    }

    return NextResponse.json({ 
      success: true, 
      message: "You are now an Admin!", 
      user: updatedUser 
    });

  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
}