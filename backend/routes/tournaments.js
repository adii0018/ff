const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const { uploadQR } = require("../config/upload");
const {
  createTournament,
  getTournaments,
  getTournamentById,
  getMyTournaments,
  updateTournament,
  deleteTournament,
} = require("../controllers/tournamentController");

router.get("/", getTournaments);
router.get("/host/mine", protect, getMyTournaments);
router.get("/:id", getTournamentById);
router.post("/create", protect, uploadQR.single("qrCodeImage"), createTournament);
router.put("/:id", protect, updateTournament);
router.delete("/:id", protect, deleteTournament);

module.exports = router;
