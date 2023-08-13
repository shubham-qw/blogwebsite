const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const postSchema = new Schema ({
    "title" : {
        type : String,
        required : true
    },
    "content" : {
        type : String,
        required : true
    },
    "userId" : {
        type : Schema.Types.ObjectId,
        ref : "user",
        required : true
    },
    "comment" : [
        {
            "user" : Schema.Types.ObjectId,
            "content" : {
                type : String,
                required : true            } 
        }
    ],
    "likes" : [
        {
            "user" : Schema.Types.ObjectId
        }
    ]
},{timestamps : true});

module.exports = model ("post",postSchema)