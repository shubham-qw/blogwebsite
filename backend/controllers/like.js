const Post = require('../models/post');

const likePost = async (req,res,next) => {
    try  {
        const {userId,postId} = req.params;

        await Post.findById(postId)
        .then ( async (post) => {
            if (post) {
                const newArr = post.likes;
               
                let flag=0;
                for (let i=0; i<newArr.length; i++) {
                    if (newArr[i].user.toString() == userId.toString) {
                        newArr = newArr.splice(i,1);
                        flag=1;
                        break;
                    }
                }

                if (!flag) {
                    let obj = {"user" : userId};
                    newArr.push(obj);
                }

                post.likes = newArr;

                await post.save()
                .then((newPost) => {
                    
                })
    
            }
            else {
                res.status(400);
                res.json({"msg" : "Post not found"});
            }
        })
    }
    catch (err) {
        res.status(500) 
        next(err);
    }
}

module.exports = {likePost}