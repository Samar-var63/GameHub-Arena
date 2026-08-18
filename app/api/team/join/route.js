import { NextResponse } from 'next/server';
import Team from '@/models/Team';
import connectDB from '@/lib/mongodb';

export async function POST(req) {
  try {
    await connectDB();
    const { teamId, userId, password } = await req.json();

    const team = await Team.findById(teamId);
    
    if (!team) {
      return NextResponse.json({ error: "Team not found" }, { status: 404 });
    }

    // Password Check
    if (team.password !== password) {
      return NextResponse.json({ error: "Incorrect team password!" }, { status: 401 });
    }

    // Check if player is already in the team
    if (team.players.includes(userId)) {
      return NextResponse.json({ error: "You are already in this team" }, { status: 400 });
    }

    // Add user to the team
    team.players.push(userId);
    await team.save();

    return NextResponse.json({ message: "Successfully joined the team!" }, { status: 200 });

  } catch (error) {
    console.error("Join Team Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}