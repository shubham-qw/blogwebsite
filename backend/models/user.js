const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const userSchema = new Schema ({
    "name" : {
        type : String,
        required : [true,"name required"],
        minLength : [5,"minimum 5 characters requried"]
    }, 
    "email" : {
        type : String,
        required : [true,"email requried"],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    "password" : {
        type : String,
        required : [true,"password required"],
        minLength : [6,"minimum 5 characters required"]
    }
})

module.exports = model ("user" , userSchema);