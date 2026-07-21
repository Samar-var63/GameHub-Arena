import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Tournament from "@/models/Tournament";
import Team from "@/models/Team";
export async function POST(request) {
try {
await connectDB();
const { tournamentId, championTeamId } = await request.json();
if (!tournamentId || !championTeamId) {
return NextResponse.json({ error: "Missing required IDs" }, { status: 400 });
}
// 1. Mark Tournament as Completed and set Champion
const tournament = await Tournament.findByIdAndUpdate(
tournamentId,
{ status: "Completed", champion: championTeamId },
{ new: true }
);
if (!tournament) {
return NextResponse.json({ error: "Tournament not found" }, { status: 404 });
}
// 2. Award massive bonus XP (e.g., 2500 points) to the Champion Team
const team = await Team.findByIdAndUpdate(
championTeamId,
{ $inc: { circuitPoints: 2500 } },
{ new: true }
);
return NextResponse.json({
message: "Tournament concluded successfully!",
champion: team.name,
bonusXP: 2500
}, { status: 200 });
} catch (error) {
return NextResponse.json({ error: error.message }, { status: 500 });
}
}