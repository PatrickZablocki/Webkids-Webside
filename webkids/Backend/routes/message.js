const express = require("express");
const router = express.Router();
const Message = require("../models/Message");

router.get("/", async (req, res) => {
  try {
    const messages = await Message.find()
      .sort({ timestamp: 1 })
      .populate("sender", "firstName lastName");
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", async (req, res) => {
  const { sender, content } = req.body;
  const message = new Message({ sender, content });
  try {
    const newMessage = await message.save();
    res.status(201).json(newMessage);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
module.exports = router;
