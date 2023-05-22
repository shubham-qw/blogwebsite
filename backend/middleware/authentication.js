const userAuthentication = (req,res,next)  => {
    const {token} = req.query;

    if (token) {
        console.log(token);
    }
}

module.exports = userAuthentication;