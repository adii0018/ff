const Tournament = require("../models/Tournament");

// POST /api/tournaments/create  (protected)
const createTournament = async (req, res) => {
  try {
    const { title, mode, entryFee, prizePool, date, time, maxPlayers, description } = req.body;

    if (!title || !mode || !date || !time || !maxPlayers)
      return res.status(400).json({ message: "Required fields missing" });

    if (!req.file)
      return res.status(400).json({ message: "QR code image is required" });

    const tournament = await Tournament.create({
      title,
      mode,
      entryFee: Number(entryFee),
      prizePool: Number(prizePool),
      date,
      time,
      maxPlayers: Number(maxPlayers),
      description,
      qrCodeImage: `http://localhost:5000/${req.file.path.replace(/\\/g, "/")}`,
      hostId: req.user._id,
    });

    res.status(201).json(tournament);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/tournaments  (public)
const getTournaments = async (req, res) => {
  try {
    const tournaments = await Tournament.find()
      .populate("hostId", "name email")
      .sort({ createdAt: -1 });
    res.json(tournaments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/tournaments/:id  (public)
const getTournamentById = async (req, res) => {
  try {
    const tournament = await Tournament.findById(req.params.id).populate(
      "hostId",
      "name email"
    );
    if (!tournament) return res.status(404).json({ message: "Tournament not found" });
    res.json(tournament);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/tournaments/host/mine  (protected) - host's own tournaments
const getMyTournaments = async (req, res) => {
  try {
    const tournaments = await Tournament.find({ hostId: req.user._id }).sort({
      createdAt: -1,
    });
    res.json(tournaments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createTournament, getTournaments, getTournamentById, getMyTournaments };
