const mongoose = require("mongoose");
const PostSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    filePath: {
      type: String,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Post", PostSchema);
