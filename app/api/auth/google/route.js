import { NextResponse } from "next/server";
import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import jwt from "jsonwebtoken";
import connectDB from "@/lib/db";
import User from "@/models/User";
import serviceAccount from "@/firebase-service-account.json";

if (getApps().length === 0) {
  initializeApp({
    credential: cert(serviceAccount),
  });
}

export async function POST(request) {
  try {
    await connectDB();
    const { idToken } = await request.json();

    if (!idToken) {
      return NextResponse.json({ error: "No token provided" }, { status: 400 });
    }

    // Verify the token with Firebase Admin
    const decoded = await getAuth().verifyIdToken(idToken);
    const { uid: googleId, email, name, picture } = decoded;

    let user = await User.findOne({ email });

    if (!user) {
      // New user via Google — generate a placeholder gamertag they can change later
      const gamertag = `Player_${googleId.slice(-6)}`;
      user = await User.create({
        name: name || "Player",
        email,
        googleId,
        authProvider: "google",
        avatar: picture || "",
        gamertag,
      });
    } else if (!user.googleId) {
      user.googleId = googleId;
      await user.save();
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    const response = NextResponse.json({
      message: "Google sign-in successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        gamertag: user.gamertag,
      },
    });

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Google auth error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}