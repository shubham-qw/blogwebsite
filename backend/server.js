const express = require("express");
require('dotenv').config();
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(cookieParser());
app.use(cors());
const db_connect = require("./db");

db_connect();

app.use("/user",require("./middleware/authentication"));

app.get("/", async (req,res) => {
    res.send("Working");
})

app.get("/shubham", async (req,res) => {
    const User = require("./models/user");
    const users = await User.find({});
    res.status(200);
    res.json({users});
})

app.use("/api", require("./routes/post"));

app.use("/api", require("./routes/user"));

app.use(require("./middleware/error_handler"));

app.listen(5000, function () {
    console.log("Server running on port 5000");
})
