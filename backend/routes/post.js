const express = require("express");
const router = express.Router();
const {createPost, getPost,deletePost,editPost, allPost} = require("../controllers/post");
const {postComment} = require('../controllers/comment');
router.post("/user/post/:userId" ,createPost);
router.get("/user/post/:userId", getPost)
router.delete("/user/post", deletePost);
router.post("/user/comment/:userId.:postId", postComment);
router.put("/user/post", editPost);
router.get("/user/post", allPost);

module.exports = router;