const express = require("express");
const router = express.Router();
const { protect, optionalAuth } = require("../middleware/auth");
const { uploadScreenshot } = require("../config/upload");
const {
  registerPlayer,
  getRegistrations,
  getMyRegistrations,
  approveRegistration,
  rejectRegistration,
} = require("../controllers/registrationController");

router.post("/", optionalAuth, uploadScreenshot.single("screenshot"), registerPlayer);
router.get("/player/mine", protect, getMyRegistrations);
router.get("/:tournamentId", protect, getRegistrations);
router.patch("/approve/:id", protect, approveRegistration);
router.patch("/reject/:id", protect, rejectRegistration);

module.exports = router;
