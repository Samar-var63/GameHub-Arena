import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Team from "@/models/Team";

// 1. Fetch all teams
export async function GET() {
  try {
    await connectDB();
    const teams = await Team.find({});
    return NextResponse.json({ success: true, teams }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// 2. Create team
export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const newTeam = await Team.create({
      name: body.name,
      captain: body.captainId,
    });
    return NextResponse.json({ success: true, team: newTeam }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}