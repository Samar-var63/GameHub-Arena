import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Team from "@/models/Team";
export async function POST(request) {
try {
await connectDB();
const { name, captainId } = await request.json();
if (!name || !captainId) {
return NextResponse.json({ error: "Team name and captain ID are required" }, { status: 400 });
}
const existingTeam = await Team.findOne({ name });
if (existingTeam) {
return NextResponse.json({ error: "Team name already taken" }, { status: 400 });
}
const newTeam = await Team.create({
name,
captain: captainId,
members: [captainId], // Captain is automatically added as member
});
return NextResponse.json({ message: "Team created successfully", team: newTeam }, { status: 201 });
} catch (error) {
return NextResponse.json({ error: error.message }, { status: 500 });
}
}