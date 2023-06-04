const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const postSchema = new Schema ({
    "title" : {
        type : String,
        default : "No title"
    },
    "content" : {
        type : String,
        default : "Empty post"
    },
    "userId" : {
        type : Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    "comment" : [
        {
            "user" : Schema.Types.ObjectId,
            "content" : {
                type : String,
                default : "No comment"            } 
        }
    ],
    "likes" : [
        {
            "user" : Schema.Types.ObjectId
        }
    ]
},{timestamps : true});

module.exports = model ("post",postSchema)