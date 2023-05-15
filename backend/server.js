const express = require("express");
const app = express();
const cors = require('cors');
app.use(express.json());

app.use(cors());

const db_connect = require("./db");

db_connect();

app.get("/", async (req,res) => {
    res.send("Working");
})

app.get("/shubham", async (req,res) => {
    const User = require("./models/user");
    const users = await User.find({});
    res.status(200);
    res.json({users});
})

app.use("/api", require("./routes/user"));

app.use(require("./middleware/error_handler"));

app.listen(5000, function () {
    console.log("Server running on port 5000");
})
