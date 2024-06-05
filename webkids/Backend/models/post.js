// const mongoose = require('mongoose');

// const postSchema = new mongoose.Schema({
//     text: String,
//     filePath: String,
//     createdAt: { type: Date, default: Date.now }
// });

// module.exports = mongoose.model('Post', postSchema);

const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    filePath: {
        type: String,
    },
}, { timestamps: true });

module.exports = mongoose.model('Post', PostSchema);