import express from "express";
import Contact from "../models/Contact.js"; // adjust path if needed

const router = express.Router();

// GET all contacts (for testing)
router.get("/", async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json({ success: true, data: contacts });
  } catch (err) {
    res.status(500).json({ success: false, msg: err.message });
  }
});

// POST contact form
router.post("/", async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ success: false, msg: "All fields are required" });
  }

  try {
    const newContact = new Contact({ name, email, message });
    await newContact.save();
    res.json({ success: true, msg: "Message received successfully!" });
  } catch (err) {
    res.status(500).json({ success: false, msg: err.message });
  }
});

export default router;
