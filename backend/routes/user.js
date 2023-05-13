const express = require("express");
const router = express.Router();
const {createUser, getUser} = require("../controllers/user");

router.route("/user")
.get(getUser)
.post(createUser);

module.exports = router;
