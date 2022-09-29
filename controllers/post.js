const Post = require("../models/post");

exports.postList = async (req, res) => {
  // sort desc
  const sort = { _id: -1 };
  const { page = 1, limit = 4 } = req.query;

  try {
    const posts = await Post.find()
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await Post.countDocuments();
    res.status(201).json({
      posts,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.savePost = async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const insertedPost = await newPost.save();
    res.status(201).json(insertedPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const updatedPost = await Post.updateOne(
      { _id: req.params.id },
      { $set: req.body }
    );
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const deletedPost = await Post.deleteOne({ _id: req.params.id });
    res.status(200).json(deletedPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
