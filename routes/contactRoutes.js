const express = require("express");
const router = express.Router();

// Test route
router.get("/", (req, res) => {
  res.send("📬 Contact API is working!");
});

// Handle POST from frontend
router.post("/", (req, res) => {
  res.json({ success: true, message: "Contact form submitted" });
});

module.exports = router;
