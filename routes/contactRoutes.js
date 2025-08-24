import express from "express";
import Contact from "../models/Contact.js";
import nodemailer from "nodemailer";

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
    // 1️⃣ Save to MongoDB
    const newContact = new Contact({ name, email, message });
    await newContact.save();

    // 2️⃣ Send email notification
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465, // secure SMTP port
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // app password for Gmail
      },
    });

    const mailOptions = {
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `New Contact Message from ${name}`,
      html: `
        <h3>New Message from Portfolio Contact Form</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br/>${message}</p>
      `,
    };

    // send mail
    await transporter.sendMail(mailOptions);

    res.json({ success: true, msg: "Message received and email sent successfully!" });
  } catch (err) {
    console.error("Email error:", err);
    res.status(500).json({ success: false, msg: "Server error while sending email" });
  }
});

export default router;
