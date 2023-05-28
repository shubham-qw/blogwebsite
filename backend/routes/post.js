const express = require("express");
const router = express.Router();
const {createPost} = require("../controllers/post");

router.post("/user/post/:userId" ,createPost);

module.exports = router;