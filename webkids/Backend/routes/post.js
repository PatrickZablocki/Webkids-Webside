const express = require('express');
const multer = require('multer');
const path = require('path');
const Post = require('../models/post');

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

router.post('/', upload.single('file'), (req, res) => {
    if (!req.body.text) {
        return res.status(400).json({ error: 'Text is required' });
    }

    const newPost = new Post({
        text: req.body.text,
        filePath: req.file ? req.file.path : null
    });

    newPost.save()
        .then(post => res.json(post))
        .catch(err => {
            console.error('Error creating post:', err);
            res.status(500).json({ error: 'Failed to create post' });
        });
});

router.delete('/:id', (req, res) => {
    const postId = req.params.id;

    Post.findByIdAndDelete(postId)
        .then(() => res.json({ message: 'Post deleted' }))
        .catch(err => {
            console.error('Error deleting post:', err);
            res.status(500).json({ error: 'Failed to delete post' });
        });
});

router.get('/', (req, res) => {
    Post.find().sort({ createdAt: -1 })
        .then(posts => res.json(posts))
        .catch(err => res.status(500).json({ error: 'Failed to fetch posts' }));
});

module.exports = router;