const Post = require("../models/post");
const mongoose = require("mongoose");

exports.postList = async (req, res) => {
  const query = [{ $sort: { _id: -1 } }];

  if (req.query.keyword && req.query.keyword != "") {
    query.push({
      $match: {
        title: { $regex: req.query.keyword },
      },
    });
  }
  try {
    const total = await Post.countDocuments(query);
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const perPage = req.query.perPage ? parseInt(req.query.perPage) : 5;
    const skip = (page - 1) * perPage;
    query.push({ $skip: skip }, { $limit: perPage });

    const posts = await Post.aggregate(query);
    res.status(200).json({
      code: "200",
      status: "OK",
      data: posts,
      page: {
        total: total,
        currentPage: page,
        perPage: perPage,
        totalPages: Math.ceil(total / perPage),
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.postDetail = async (req, res) => {
  try {
    const query = [
      {
        $lookup: {
          from: "comments",
          localField: "_id",
          foreignField: "postID",
          as: "comment",
        },
      },
      { $match: { _id: mongoose.Types.ObjectId(req.params.id) } },
    ];
    const posts = await Post.aggregate(query);
    res.status(200).json({
      code: "200",
      status: "OK",
      data: posts,
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
