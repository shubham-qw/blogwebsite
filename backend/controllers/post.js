const Post = require("../models/post");

const createPost = async (req,res,next) => {
    try {
        const {userId} = req.params;
        const {post,content} = req.body;
        
        console.log(userId,post,content);
    }
    catch (err) {
        res.status(500);
        next(err);
    }
}

module.exports = {createPost}