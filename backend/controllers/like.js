const Post = require('../models/post');

const likePost = async (req,res,next) => {
    try  {
        const {userId,postId} = req.query;
        console.log(userId,postId);
        await Post.findById(postId)
        .then ( async (post) => {
            
            if (post) {
                const newArr = post.likes;    
                let flag=0;
                for (let i=0; i<newArr.length; i++) {
                    
                    if (newArr[i].user && (newArr[i].user.toString() == userId.toString())) {
                        console.log("comming32");
                        newArr.splice(i,1);
                        console.log(newArr);
                        flag=1;
                        break;
                    }
                }
                console.log("dsndas");
                console.log("flag", flag);
                if (!flag) {
                    console.log("comming");
                    let obj = {"user" : userId};
                    newArr.push(obj);
                }

                post.likes = newArr;

                await post.save();

                return res.send({success : true});
            }
            else {
                res.status(400);
                res.json({"msg" : "Post not found"});
            }
        })
    }
    catch (err) {
        console.log(err);
        res.status(500) 
        next(err);
    }
}

module.exports = {likePost}