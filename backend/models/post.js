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
        ref : "User"
    }
},{timestamps : true});

module.exports = model ("post",postSchema)