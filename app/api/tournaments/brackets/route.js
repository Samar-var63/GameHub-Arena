import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Tournament from "@/models/Tournament";
import Bracket from "@/models/Bracket";
export async function POST(request) {
try {
await connectDB();
const { tournamentId } = await request.json();
const tournament = await Tournament.findById(tournamentId);
if (!tournament) return NextResponse.json({ error: "Tournament not found" }, { status: 404 });
let teams = tournament.teams; // Array of Team IDs registered
// Shuffle teams for random matchmaking
teams = teams.sort(() => 0.5 - Math.random());
const matches = [];
for (let i = 0; i < teams.length; i += 2) {
matches.push({
matchId: `T-${tournamentId}-R1-M${Math.floor(i/2) + 1}`,
teamA: teams[i],
teamB: teams[i+1] || null, // Handle bye if odd number of teams
status: teams[i+1] ? "Pending" : "Completed",
winner: teams[i+1] ? null : teams[i]
});
}
const newBracket = await Bracket.create({
tournamentId,
round: 1,
matches
});
return NextResponse.json({ message: "Round 1 Brackets generated", bracket: newBracket }, { status: 200 });
} catch (error) {
return NextResponse.json({ error: error.message }, { status: 500 });
}
}