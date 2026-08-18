import { NextResponse } from 'next/server';
import Team from '@/models/Team'; // Apna sahi path dalna
import connectDB from '@/lib/mongodb'; // Database connection

export async function POST(req) {
  try {
    await connectDB();
    const { teamId, userId } = await req.json(); 

    // 1. Team ko database se find karo
    const team = await Team.findById(teamId);
    
    if (!team) {
      return NextResponse.json({ error: "Team not found" }, { status: 404 });
    }

    // 2. Check karo ki kya leave karne wala user hi captain hai?
    const isCaptain = team.captain.toString() === userId.toString();

    // 3. User ko team ke players array se bahar nikalo
    const remainingPlayers = team.players.filter(
      (playerId) => playerId.toString() !== userId.toString()
    );

    if (isCaptain) {
      if (remainingPlayers.length > 0) {
        // Situation A: Captain ja raha hai, par aur players bache hain
        // Naye captain ko array ke pehle player par set kardo
        team.captain = remainingPlayers[0];
        team.players = remainingPlayers;
        await team.save();
        
        return NextResponse.json({ message: "You left. New captain assigned." }, { status: 200 });
      } else {
        // Situation B: Captain akela tha, ab team khali ho gayi
        // Toh seedha team ko delete kar do
        await Team.findByIdAndDelete(teamId);
        
        return NextResponse.json({ message: "Team deleted as it has no players left." }, { status: 200 });
      }
    } else {
      // Situation C: Normal player ja raha hai, captain wahi rahega
      team.players = remainingPlayers;
      await team.save();
      
      return NextResponse.json({ message: "You left the team successfully." }, { status: 200 });
    }

  } catch (error) {
    console.error("Leave Team Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}