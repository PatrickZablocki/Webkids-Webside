const express = require('express');
const router = express.Router();
const Message = require('../models/message');
const User = require('../models/user');


router.get('/users', async (req, res) => {
    try {
        const currentUserId = req.query.currentUserId; 
        const users = await User.find({ _id: { $ne: currentUserId } }); 
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error: error.message });
    }
});

router.get('/messages/:senderId/:receiverId', async (req, res) => {
    const { senderId, receiverId } = req.params;
    try {
        const messages = await Message.find({
            $or: [
                { sender: senderId, receiver: receiverId },
                { sender: receiverId, receiver: senderId },
            ],
        }).sort({ timestamp: -1 });

        res.json(messages);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching messages', error: error.message });
    }
});

router.post('/messages', async (req, res) => {
    const { senderId, receiverId, content } = req.body;

    const newMessage = new Message({
        sender: senderId,
        receiver: receiverId,
        content,
    });

    try {
        const savedMessage = await newMessage.save();
        res.json(savedMessage);
    } catch (error) {
        res.status(500).json({ message: 'Error saving message', error: error.message });
    }
});

module.exports = router;