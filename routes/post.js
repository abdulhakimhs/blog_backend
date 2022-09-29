const express = require("express");
const {
  postList,
  savePost,
  updatePost,
  deletePost,
} = require("../controllers/post");

const router = express.Router();

router.get("/posts", postList);
router.post("/post/save", savePost);
router.patch("/post/:id", updatePost);
router.delete("/post/:id", deletePost);

module.exports = router;
