const mongoose = require('mongoose');

const db_connect = async () => {
    await mongoose.connect('mongodb://127.0.0.1:27017/training1')
    .then (() => {
        console.log("Connection successfull");
    })
    .catch ((err) => {
        console.log(err);
    })
}

module.exports = db_connect;

