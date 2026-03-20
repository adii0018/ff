const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const { uploadScreenshot } = require("../config/upload");
const {
  registerPlayer,
  getRegistrations,
  approveRegistration,
  rejectRegistration,
} = require("../controllers/registrationController");

router.post("/", uploadScreenshot.single("screenshot"), registerPlayer);
router.get("/:tournamentId", protect, getRegistrations);
router.patch("/approve/:id", protect, approveRegistration);
router.patch("/reject/:id", protect, rejectRegistration);

module.exports = router;
