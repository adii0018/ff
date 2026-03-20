const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema(
  {
    tournamentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tournament",
      required: true,
    },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null }, // optional player account link
    playerName: { type: String, required: true, trim: true },
    uid: { type: String, required: true, trim: true },
    ign: { type: String, required: true, trim: true },
    contact: { type: String, required: true, trim: true },
    transactionId: { type: String, required: true, trim: true },
    screenshot: { type: String, default: "" }, // Cloudinary URL (optional)
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Registration", registrationSchema);
