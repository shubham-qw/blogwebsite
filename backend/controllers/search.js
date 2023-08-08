const post = require("../models/post");
const User = require("../models/user");

const getResult = async (req,res,next) => {
    try {
        const {name} = req.body;
        console.log(name);
        await User.findOne({"name" : name})
        .then (async (user) => {
            if (user) {
                await post.find({"userId" : user._id})
                .then ((posts) => {
    
                    res.status(200)
                    res.json({"success" : true, "posts" : posts});
                })
            }
            else {
                res.status(400)
                res.json({"message" : "User not Found"})
            }
        })
        
    }
    catch (err) {
        res.status(500)
        next(err);
    }
}

module.exports = {getResult}