const jwt = require("jsonwebtoken")

//make sure user is logged in - authentication
exports.loginRequired = function(req, res ,next) {
    try {
        //get the jwt token from axios defaults authorization header
        const token = req.headers.authorization.split(" ")[1]
        jwt.verify(token, process.env.SECRET_KEY, function(err, decoded) {
            if(decoded) {
                return next()
            } else {
                return next({
                    status: 401,
                    message: "Please login first"
                })
            }
        })
    } catch (e) {
        return next({
            status: 401,
            message: "Please login first"
        })
    }
}

//make sure it is corect user - authorization
exports.ensureCorrectUser = function(req, res, next){
    try {
        //get the jwt token from axios defaults authorization header
        const token = req.headers.authorization.split(" ")[1]
        jwt.verify(token, process.env.SECRET_KEY, function(err, decoded) {
            if(decoded && decoded.id === req.params.id) {
                return next()
            } else {
                return next({
                    status: 401,
                    message: "Unauthorized user"
                })
            }
        })
    } catch (err) {
        return next({
            status: 401,
            message: "Unauthorized user"
        })
    }
}