const express = require("express");
const app = express();
app.use(express.json());
const db_connect = require("./db");

db_connect();

app.get("/", async (req,res) => {
    res.send("Working");
})

app.use("/api", require("./routes/user"));

app.use(require("./middleware/error_handler"));

app.listen(5000, function () {
    console.log("Server running on port 5000");
})
