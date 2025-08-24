import express from "express";
import Contact from "../models/Contact.js";

const router = express.Router();

// POST new contact message
router.post("/", async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    res.json({ success: true, message: "Message received!", data: contact });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// GET all messages (optional for admin)
router.get("/", async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
