const express = require("express");
const {
  postList,
  postDetail,
  savePost,
  updatePost,
  deletePost,
} = require("../controllers/post");

const router = express.Router();

router.get("/posts", postList);
router.get("/post/:id", postDetail);
router.post("/post/save", savePost);
router.patch("/post/:id", updatePost);
router.delete("/post/:id", deletePost);

module.exports = router;
