import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Bracket from "@/models/Bracket";
export async function POST(request) {
try {
await connectDB();
const { matchId, winnerId } = await request.json();
if (!matchId || !winnerId) {
return NextResponse.json({ error: "Missing matchId or winnerId" }, { status: 400 });
}
// 1. Find the current bracket round containing this match
const currentBracket = await Bracket.findOne({ "matches.matchId": matchId });
if (!currentBracket) {
return NextResponse.json({ error: "Match not found in any bracket" }, { status: 404 });
}
const match = currentBracket.matches.find((m) => m.matchId === matchId);
match.status = "Completed";
match.winner = winnerId;
await currentBracket.save();
// 2. Advancement Logic: Promote winner to the next round (round + 1)
const nextRoundNumber = currentBracket.round + 1;
let nextBracket = await Bracket.findOne({
tournamentId: currentBracket.tournamentId,
round: nextRoundNumber
});
// Create next round's bracket object if it doesn't exist yet
if (!nextBracket) {
nextBracket = new Bracket({
tournamentId: currentBracket.tournamentId,
round: nextRoundNumber,
matches: []
});
}
// Find if a placeholder match already exists or needs calculation
const currentMatchIndex = currentBracket.matches.findIndex((m) => m.matchId === matchId);
const targetMatchIndex = Math.floor(currentMatchIndex / 2);
const isTeamA = currentMatchIndex % 2 === 0;
let targetMatch = nextBracket.matches[targetMatchIndex];
if (!targetMatch) {
targetMatch = {
matchId: `T-${currentBracket.tournamentId}-R${nextRoundNumber}-M${targetMatchIndex + 1}`,
teamA: null,
teamB: null,
status: "Pending",
scoreA: 0,
scoreB: 0
};
nextBracket.matches[targetMatchIndex] = targetMatch;
}
if (isTeamA) {
nextBracket.matches[targetMatchIndex].teamA = winnerId;
} else {
nextBracket.matches[targetMatchIndex].teamB = winnerId;
}
await nextBracket.save();
return NextResponse.json({
message: "Dispute resolved and winner advanced to next round",
nextRound: nextRoundNumber
}, { status: 200 });
} catch (error) {
return NextResponse.json({ error: error.message }, { status: 500 });
}
}