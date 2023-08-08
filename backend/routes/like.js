const express = require("express");
const router = express.Router();
const {likePost} = require("../controllers/like");
 
router.get("/like", likePost);

module.exports = router;