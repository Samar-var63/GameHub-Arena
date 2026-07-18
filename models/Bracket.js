import mongoose from "mongoose";
const BracketSchema = new mongoose.Schema({
tournamentId: { type: mongoose.Schema.Types.ObjectId, ref: "Tournament", required: true },
round: { type: Number, required: true }, // e.g., 1 for Quarter-finals, 2 for Semis
matches: [{
matchId: String,
teamA: { type: mongoose.Schema.Types.ObjectId, ref: "Team" },
teamB: { type: mongoose.Schema.Types.ObjectId, ref: "Team" },
winner: { type: mongoose.Schema.Types.ObjectId, ref: "Team" },
scoreA: { type: Number, default: 0 },
scoreB: { type: Number, default: 0 },
status: { type: String, default: "Pending" } // Pending, Disputed, Completed
}]
}, { timestamps: true });
export default mongoose.models.Bracket || mongoose.model("Bracket", BracketSchema);