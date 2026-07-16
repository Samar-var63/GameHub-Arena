import mongoose from "mongoose";
const TournamentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Tournament title is required"],
    },
    description: String,
    gameName: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Upcoming", "Ongoing", "Completed"],
      default: "Upcoming",
    },
    maxTeams: {
      type: Number,
      required: true,
    },
    registeredTeams: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team",
      },
    ],
    startDate: Date,
  },
  { timestamps: true }
);
export default mongoose.models.Tournament || mongoose.model("Tournament", TournamentSchema);