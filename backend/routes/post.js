const express = require("express");
const router = express.Router();
const {createPost, getPost} = require("../controllers/post");
const {postComment} = require('../controllers/comment');
router.post("/user/post/:userId" ,createPost);
router.get("/user/post/:userId", getPost)

router.post("/user/comment/:userId.:postId", postComment);

module.exports = router;