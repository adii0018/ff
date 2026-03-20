const Tournament = require("../models/Tournament");

// POST /api/tournaments/create  (protected - host)
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
      qrCodeImage: `${process.env.BACKEND_URL || "http://localhost:5000"}/${req.file.path.replace(/\\/g, "/")}`,
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
    const filter = {};
    if (req.query.status) filter.status = req.query.status;
    const tournaments = await Tournament.find(filter)
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
    const tournament = await Tournament.findById(req.params.id).populate("hostId", "name email");
    if (!tournament) return res.status(404).json({ message: "Tournament not found" });
    res.json(tournament);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/tournaments/host/mine  (protected - host)
const getMyTournaments = async (req, res) => {
  try {
    const tournaments = await Tournament.find({ hostId: req.user._id }).sort({ createdAt: -1 });
    res.json(tournaments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT /api/tournaments/:id  (protected - host)
const updateTournament = async (req, res) => {
  try {
    const tournament = await Tournament.findById(req.params.id);
    if (!tournament) return res.status(404).json({ message: "Tournament not found" });
    if (tournament.hostId.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Not authorized" });

    const { title, mode, entryFee, prizePool, date, time, maxPlayers, description, roomId, roomPassword, status } = req.body;

    if (title) tournament.title = title;
    if (mode) tournament.mode = mode;
    if (entryFee !== undefined) tournament.entryFee = Number(entryFee);
    if (prizePool !== undefined) tournament.prizePool = Number(prizePool);
    if (date) tournament.date = date;
    if (time) tournament.time = time;
    if (maxPlayers) tournament.maxPlayers = Number(maxPlayers);
    if (description !== undefined) tournament.description = description;
    if (roomId !== undefined) tournament.roomId = roomId;
    if (roomPassword !== undefined) tournament.roomPassword = roomPassword;
    if (status) tournament.status = status;

    await tournament.save();
    res.json(tournament);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE /api/tournaments/:id  (protected - host)
const deleteTournament = async (req, res) => {
  try {
    const tournament = await Tournament.findById(req.params.id);
    if (!tournament) return res.status(404).json({ message: "Tournament not found" });
    if (tournament.hostId.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Not authorized" });

    await tournament.deleteOne();
    res.json({ message: "Tournament deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createTournament, getTournaments, getTournamentById, getMyTournaments, updateTournament, deleteTournament };
