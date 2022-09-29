const Comment = require("../models/comment");

exports.commentList = async (req, res) => {
  try {
    const comments = await Comment.find();
    res.status(201).json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.saveComment = async (req, res) => {
  const newComment = new Comment(req.body);
  try {
    const insertedComment = await newComment.save();
    res.status(201).json(insertedComment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateComment = async (req, res) => {
  try {
    const updatedComment = await Comment.updateOne(
      { _id: req.params.id },
      { $set: req.body }
    );
    res.status(200).json(updatedComment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const deletedComment = await Comment.deleteOne({ _id: req.params.id });
    res.status(200).json(deletedComment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
