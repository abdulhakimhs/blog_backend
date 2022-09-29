const express = require("express");
const {
  commentList,
  saveComment,
  updateComment,
  deleteComment,
} = require("../controllers/comment");

const router = express.Router();

router.get("/comments", commentList);
router.post("/comment/save", saveComment);
router.patch("/comment/:id", updateComment);
router.delete("/comment/:id", deleteComment);

module.exports = router;
