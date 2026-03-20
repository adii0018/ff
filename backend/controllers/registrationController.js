const Registration = require("../models/Registration");
const Tournament = require("../models/Tournament");

// POST /api/registrations  (public or player-auth)
const registerPlayer = async (req, res) => {
  try {
    const { tournamentId, playerName, uid, ign, contact, transactionId } = req.body;

    if (!tournamentId || !playerName || !uid || !ign || !contact || !transactionId)
      return res.status(400).json({ message: "All required fields must be filled" });

    const tournament = await Tournament.findById(tournamentId);
    if (!tournament) return res.status(404).json({ message: "Tournament not found" });

    const count = await Registration.countDocuments({ tournamentId, status: { $ne: "rejected" } });
    if (count >= tournament.maxPlayers)
      return res.status(400).json({ message: "Tournament is full" });

    const duplicate = await Registration.findOne({ tournamentId, uid });
    if (duplicate)
      return res.status(400).json({ message: "This UID is already registered" });

    // Link to player account if authenticated
    const userId = req.user?._id || null;

    const registration = await Registration.create({
      tournamentId,
      userId,
      playerName,
      uid,
      ign,
      contact,
      transactionId,
      screenshot: req.file
        ? `${process.env.BACKEND_URL || "http://localhost:5000"}/${req.file.path.replace(/\\/g, "/")}`
        : "",
    });

    res.status(201).json({ message: "Registration submitted successfully", registration });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/registrations/:tournamentId  (protected - host)
const getRegistrations = async (req, res) => {
  try {
    const tournament = await Tournament.findById(req.params.tournamentId);
    if (!tournament) return res.status(404).json({ message: "Tournament not found" });

    if (tournament.hostId.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Not authorized" });

    const registrations = await Registration.find({ tournamentId: req.params.tournamentId }).sort({ createdAt: -1 });
    res.json(registrations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/registrations/player/mine  (protected - player)
const getMyRegistrations = async (req, res) => {
  try {
    const registrations = await Registration.find({ userId: req.user._id })
      .populate("tournamentId")
      .sort({ createdAt: -1 });
    res.json(registrations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PATCH /api/registrations/approve/:id  (protected - host)
const approveRegistration = async (req, res) => {
  try {
    const reg = await Registration.findById(req.params.id).populate("tournamentId");
    if (!reg) return res.status(404).json({ message: "Registration not found" });

    if (reg.tournamentId.hostId.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Not authorized" });

    reg.status = "approved";
    await reg.save();
    res.json({ message: "Player approved", registration: reg });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PATCH /api/registrations/reject/:id  (protected - host)
const rejectRegistration = async (req, res) => {
  try {
    const reg = await Registration.findById(req.params.id).populate("tournamentId");
    if (!reg) return res.status(404).json({ message: "Registration not found" });

    if (reg.tournamentId.hostId.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Not authorized" });

    reg.status = "rejected";
    await reg.save();
    res.json({ message: "Player rejected", registration: reg });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { registerPlayer, getRegistrations, getMyRegistrations, approveRegistration, rejectRegistration };
