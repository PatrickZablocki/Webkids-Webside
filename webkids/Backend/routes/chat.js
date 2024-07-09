// // server/routes/chat.js
// const express = require('express');
// const router = express.Router();
// const Message = require('../models/message'); // Убедитесь, что путь правильный

// // Get all messages
// router.get('/', async (req, res) => {
//     try {
//         const messages = await Message.find().sort({ timestamp: 1 });
//         res.json(messages);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });

// // Save a new message
// router.post('/', async (req, res) => {
//     const { user, message } = req.body;
//     const newMessage = new Message({ user, message });

//     try {
//         const savedMessage = await newMessage.save();
//         res.status(201).json(savedMessage);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });

// module.exports = router;