

const error_handler = (err,req,res,next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    res.status(statusCode);
    res.json(
        {
            "message" : err.message,
        }
    )
}

module.exports = error_handler;