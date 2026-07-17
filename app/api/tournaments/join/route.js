import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Tournament from "@/models/Tournament";
import Team from "@/models/Team";
export async function POST(request) {
try {
await connectDB();
const { tournamentId, teamId } = await request.json();
if (!tournamentId || !teamId) {
return NextResponse.json({ error: "Tournament ID and Team ID are required" }, { status: 400 });
}
const tournament = await Tournament.findById(tournamentId);
if (!tournament) {
return NextResponse.json({ error: "Tournament not found" }, { status: 404 });
}
// Check if tournament is already full
if (tournament.teams && tournament.teams.length >= tournament.maxTeams) {
return NextResponse.json({ error: "Tournament slots are fully booked" }, { status: 400 });
}
// Check if team is already registered in this tournament
if (tournament.teams && tournament.teams.includes(teamId)) {
return NextResponse.json({ error: "Team is already registered for this tournament" }, { status: 400 });
}
// Add Team to Tournament
tournament.teams.push(teamId);
await tournament.save();
return NextResponse.json({ message: "Successfully registered team for tournament", tournament }, { status: 200 });
} catch (error) {
return NextResponse.json({ error: error.message }, { status: 500 });
}
}