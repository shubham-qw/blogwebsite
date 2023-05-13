const User = require("../models/user");

const getUser = async (req,res,next)  => {
    try {
     const user = await User.find({});
     res.json({"users" : user});
    }
    catch (err) {
        next(err);
    }
}

const createUser = async (req,res,next) => {
    try {
        const {password,name,email} = req.body;

        const user = new User (
            {
                password,
                name,
                email
            }
        )

        await user.save()
        .then ((newUser) => {
            res.status(200); 
            res.json({"message" : "User created successfully", "user" : newUser});
        })
        .catch ((err) => {
            res.status(400)
            next(err);
        })
    }
    catch (err) {
        next(err);
    }
}
module.exports = {createUser, getUser};