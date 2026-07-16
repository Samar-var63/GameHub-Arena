import mongoose from "mongoose";
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    gamertag: {
      type: String,
      required: [true, "Gamertag is required"],
      unique: true,
    },
    role: {
      type: String,
      enum: ["Player", "Captain", "Organizer", "Guest"],
      default: "Player",
    },
    avatar: { type: String, default: "" },
    game: { type: String, default: "" },
    skillTier: { type: String, default: "Bronze" },
    stats: {
      matches: { type: Number, default: 0 },
      wins: { type: Number, default: 0 },
      kills: { type: Number, default: 0 },
      deaths: { type: Number, default: 0 },
      assists: { type: Number, default: 0 },
    },
  },
  { timestamps: true }
);
export default mongoose.models.User || mongoose.model("User", UserSchema);