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
        await Post.find({"userId" : userId}).populate("userId")
        .then ((posts) => {
            res.status(200).json({"success" : true, "posts" : posts});
        })
        .catch ((err) => {
            console.log(err);
            res.status(400)
            next(err);
        })
    }
    catch (err){
        res.status(500);
        next(err);
    }
}

const deletePost = async (req,res,next) => {
    try {
        const {id} = req.query;
        console.log(id);
        await Post.deleteOne({_id : id})
        res.send({success : true});
    }
    catch (err){
        console.log(err);
        res.status(500);
        next(err);
    }
} 

const allPost = async (req,res,next) => {
    try {
        const {userId} = req.query;
        await Post.find({"userId" : {$ne : userId}}).populate("userId")
        .then ((posts) => {
            res.status(200).json({"success" : true, "posts" : posts});
        })
        .catch ((err) => {
            console.log(err);
            res.status(400)
            next(err);
        })
    }
    catch (err){
        res.status(500);
        next(err);
    }
}

const editPost = async (req,res,next) => {
    try {
        const {postId} = req.query;
        const {content,title} = req.body;
        console.log(content,title);
        const post = await Post.findById({_id : postId});
        console.log(post);
        post.title = title;
        post.content = content;
        const newPost = await post.save();
        console.log(newPost);
        res.send({success : true});
    }
    catch (err){
        console.log(err);
        res.status(500);
        next(err);
    }
}

module.exports = {createPost, getPost, deletePost,editPost, allPost}