const {getResult} = require("../controllers/search");
const express = require("express");
const router = express.Router();

router.post("/search", getResult);

module.exports = router;