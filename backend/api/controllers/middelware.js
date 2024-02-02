const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports.auth = (req,res,next) => {
    try {
        //we need to parse cookies into javascrip objects
        //using the cookie-parser
        //this is an express middleware that reads any incoming cookies and parse it into req.cookies object
        const token=req.cookies.token;
        console.log(token);
        if(!token){
            return res.status(401).json({errorMessage:"unauthorized"});
        }
        //verifiy the tooken to check if it has our secret and not a random tooken
        //if not verified it will go to the catch and
        //if verified it will decode it and put the tooken value an an object
        //it have the user id
        const verified=jwt.verify(token,process.env.JWT_SECRET);
        
        //we create a new property in the request with the name user and it will carry the user id from verified
        req.user=verified.user;
        console.log(verified.user);
        next();
        
    } catch (error) {
        console.log(error.message); 
        res.status(401).json({errorMessage:"unauthorized"});
    }
}

module.exports.admin = (req,res,next) => {
    if(req.user.type == 'admin') {
        next();
    } 
    return res.status(401).send("access denied");
}

