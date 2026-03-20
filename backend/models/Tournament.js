const mongoose = require("mongoose");

const tournamentSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    mode: {
      type: String,
      enum: ["Solo", "Duo", "Squad", "CS"],
      required: true,
    },
    entryFee: { type: Number, required: true, min: 0 },
    prizePool: { type: Number, required: true, min: 0 },
    date: { type: String, required: true },
    time: { type: String, required: true },
    maxPlayers: { type: Number, required: true, min: 1 },
    description: { type: String, trim: true },
    qrCodeImage: { type: String, required: true }, // Cloudinary URL
    hostId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    roomId: { type: String, default: "" },
    roomPassword: { type: String, default: "" },
    status: { type: String, enum: ["upcoming", "live", "completed"], default: "upcoming" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Tournament", tournamentSchema);
