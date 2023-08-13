const Post = require("../models/post");

const postComment = async (req,res,next) => {
    try {
        const {userId,postId} = req.params;
        console.log(req.body);
        const {content} = req.body;
        console.log(content);
        console.log(userId,postId);
        await Post.findById(postId)
        .then (async(post) => {
            console.log(post);
            if (post) {
                const obj = {"user" : userId,"content" : content};
                const newArr = post.comment;
                newArr.push(obj);
                post.comment = newArr;
                await post.save()
                .then ((newPost) => {
                    res.status(201).json({"success" : true, "post" : newPost});
                }) 
            }
            else {
                res.status(400);
                res.json({"msg" : "Post not found"})
            }
        })

    }
    catch (err) {
        res.status(500);
        next(err);
    }
}

module.exports = {postComment}