const express = require("express");
const router = express.Router();
const Message = require("../models/Message");

// Add message
router.post("/", async (req, res) => {
  try {
    const message = new Message(req.body);
    await message.save();
    res.json({ message: "Message received", messageData: message });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get all messages
router.get("/", async (req, res) => {
  try {
    const messages = await Message.find(); // Mongoose uses `find()` instead of `findAll()`
    res.json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
