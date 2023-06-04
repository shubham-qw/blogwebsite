const Post = require("../models/post");

const createPost = async (req,res,next) => {
    try {
        const {userId} = req.params;
        const {title,content} = req.body;

        const post = new Post ({
            userId,title,content
        })

        post.save()
        .then((newPost) => {
            res.status(201).json({success : true, post : newPost})
        })
        .catch ((err) => {
            res.status(400);
            next(err);
        })
    }
    catch (err) {
        res.status(500);
        next(err);
    }
}


const getPost = async (req,res,next) => {
    try {
        const {userId} = req.params;

        await Post.find({"userId" : userId})
        .then ((posts) => {
            res.status(200).json({"success" : true, "posts" : posts});
        })
        .catch ((err) => {
            res.status(400)
            next(err);
        })
    }
    catch (err){
        res.status(500);
        next(err);
    }
}

module.exports = {createPost, getPost}