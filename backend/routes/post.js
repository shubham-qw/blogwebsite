const express = require("express");
const router = express.Router();
const {createPost, getPost} = require("../controllers/post");

router.post("/user/post/:userId" ,createPost);
router.get("/user/post/:userId", getPost)

module.exports = router;