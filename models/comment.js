const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
  fromname: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  postID: {
    type: String,
    required: true,
  },
  isPublish: {
    type: Boolean,
    required: true,
    default: true,
  },
});

module.exports = mongoose.model("Comment", commentSchema);
