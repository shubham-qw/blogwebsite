const User = require("../models/user");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET;

const generateToken = async (userId) => {
    return await jwt.sign({userId},secret,{expiresIn : "1d"});
}

const getUser = async (req,res,next)  => {
    try {
        const {email,password} = req.body;
        const user = await User.findOne({email : email}); 

        if (user) {
            const checkPassword = await bcrypt.compare(password,user.password);
            if (checkPassword) {
                const token = await generateToken(user._id);
                res.status(200);
                res.json({"success" : true, "message" : "user successfully loged in.", "token" : token,userId : user._id,userName : user.name});
            }
            else {
                res.status(400);
                res.json({"message" : "Incorrect password please try again"});
            }
        }
        else {
            res.status(400);;
            res.json({"message" : "User not found."})
        }
    }
    catch (err) {
        res.status(500);
        next(err);
    }
}

const userInfo = async (req,res,next) => {
    try {
        const {userId} = req.params;
        const user = await User.findById(userId);

        if (user) {
            res.status(200).json({success : true, userName : user.name});
        }
        else {
            res.status(400),json({"msg" : "User not found"});
        }
        
    }
    catch (err) {
        res.status(500);
        next(err);
    }
}

const createUser = async (req,res,next) => {
    try {
        const {password,name,email} = req.body;

        const isUser = await User.findOne({email : email});

        if (isUser) {
            res.status(400);
            res.json({"message" : "User already exists."});
        }
        else {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);
        const user = new User (
            {
                password : hashedPassword,
                name,
                email
            }
        )

        await user.save()
        .then (async (newUser) => {
            const token = await generateToken(newUser._id);
            res.status(200); 
            res.json({"success" : true, "message" : "User successfully created.", "token" : token,userId : user._id,userName : user.name});
        })
        .catch ((err) => {
            res.status(400)
            next(err);
        })
    }
    }
    catch (err) {
        res.status(500);
        next(err);
    }
}


const deleteUser = async (req,res,next) => {
    try {
        const {userId} = req.params;
        await User.findByIdAndDelete(userId)
        .then ((user) => {
            res.status(200)
            res.json({"message" : "User deleted successfully", "user" : user});
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

const updateUser = (req,res,next) => {
    try {

    }
    catch (err) {
        res.status(500);
        next(err);
    }
}
module.exports = {createUser, getUser, deleteUser,userInfo};