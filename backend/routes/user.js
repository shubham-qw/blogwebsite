const express = require("express");
const router = express.Router();
const {createUser, getUser, deleteUser, userInfo} = require("../controllers/user");

router.route("/user")
.post(getUser);

router.post("/user/register" , createUser);
router.get("/user/:userId", userInfo);
router.delete("/user/:userId",deleteUser);

module.exports = router;
