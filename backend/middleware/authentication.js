const jwt = require('jsonwebtoken');

const userAuthentication = (req,res,next)  => {
    const {token} = req.query;
    if (!token) {
        res.status(401);
        res.json({"msg" : "Token not found"});
    }
    else {
        jwt.verify(token,process.env.SECRET,function (err,user) {
            if (err) {
                res.status(403);
                res.json({"msg" : "Token expired"});
                }
            else {
                res.status(200);
                res.json({success : true, userId : user.userId});
            }
        });
    }
}

module.exports = userAuthentication;