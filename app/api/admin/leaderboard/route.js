import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Team from "@/models/Team";
import { requireAdmin } from "@/lib/authGuard";

// GET: View the leaderboard (protected)
export async function GET() {
  try {
    // 1. Check if the user is an admin using the helper we just created
    const session = await requireAdmin();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized: Admins only" }, { status: 401 });
    }

    // 2. Connect to the database and fetch teams, sorted by points (highest first)
    await connectDB();
    const teams = await Team.find({}).sort({ circuitPoints: -1 });

    return NextResponse.json({ teams }, { status: 200 });
  } catch (error) {
    console.error("Error fetching admin leaderboard:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// PATCH: Adjust a team's points (protected)
export async function PATCH(req) {
  try {
    // 1. Enforce admin auth guard
    const session = await requireAdmin();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized: Admins only" }, { status: 401 });
    }

    // 2. Parse the incoming data
    const body = await req.json();
    const { teamId, circuitPoints } = body;

    if (!teamId || typeof circuitPoints !== 'number') {
      return NextResponse.json({ error: "Invalid data: Requires teamId and circuitPoints (number)" }, { status: 400 });
    }

    // 3. Connect to DB and update the specific team
    await connectDB();
    const updatedTeam = await Team.findByIdAndUpdate(
      teamId,
      { circuitPoints },
      { new: true } // Returns the updated document
    );

    if (!updatedTeam) {
      return NextResponse.json({ error: "Team not found" }, { status: 404 });
    }

    return NextResponse.json({ 
      message: "Points updated successfully", 
      team: updatedTeam 
    }, { status: 200 });

  } catch (error) {
    console.error("Error updating team points:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}