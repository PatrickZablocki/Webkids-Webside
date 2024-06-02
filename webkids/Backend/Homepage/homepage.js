require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(express.json());
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));


const postSchema = new mongoose.Schema({
  text: String,
  filePath: String,
  createdAt: { type: Date, default: Date.now }
});

const Post = mongoose.model('Post', postSchema);


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });


app.post('/api/posts', upload.single('file'), (req, res) => {
  const newPost = new Post({
    text: req.body.text,
    filePath: req.file ? req.file.path : null
  });

  newPost.save()
    .then(post => res.json(post))
    .catch(err => {
      console.error('Error creating post:', err);
      res.status(500).json({ error: err.message });
    });
});

app.delete('/api/posts/:id', (req, res) => {
  const postId = req.params.id;

  Post.findByIdAndDelete(postId)
    .then(() => res.json({ message: 'Post deleted' }))
    .catch(err => {
      console.error('Error deleting post:', err);
      res.status(500).json({ error: err.message });
    });
});


app.get('/api/posts', (req, res) => {
  Post.find().sort({ createdAt: -1 })
    .then(posts => res.json(posts))
    .catch(err => res.status(500).json({ error: err.message }));
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));