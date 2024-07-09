// server/models/Message.js
// const mongoose = require('mongoose');

// const MessageSchema = new mongoose.Schema({
//     user: String,
//     message: String,
//     timestamp: {
//         type: Date,
//         default: Date.now,
//     },
// });

// module.exports = mongoose.models.Message || mongoose.model('Message', MessageSchema);

// const mongoose = require('mongoose');

// const MessageSchema = new mongoose.Schema({
//   sender: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
//   recipient: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
//   text: String,
//   file: String,
// }, {timestamps:true});

// const MessageModel = mongoose.model('Message', MessageSchema);

// module.exports = MessageModel;
