import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Tournament from "@/models/Tournament";
export async function GET() {
try {
await connectDB();
// Fetch all tournaments sorted by the start date
const tournaments = await Tournament.find({}).sort({ startDate: 1 });
return NextResponse.json({ tournaments }, { status: 200 });
} catch (error) {
return NextResponse.json({ error: error.message }, { status: 500 });
}
}