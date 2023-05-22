const express = require("express");
const router = express.Router();
const {createUser, getUser, deleteUser} = require("../controllers/user");

router.route("/user")
.post(getUser);

router.post("/user/register" , createUser);

router.delete("/user/:userId",deleteUser);

module.exports = router;
