import jwt from 'jsonwebtoken'

function authMiddleware(req,res,next){
    const token = req.headers['authorization'] //this way we will read authorization from headers(check frontend code(fetchtodos() function) to know why this line we used)
    if(!token){return res.status(401).json({ message: "No token provided" })} //guard code

    jwt.verify(token, process.env.JWT_SECRET, (err,decoded) => {
        if(err){return res.status(401).json({ message: "Invalid token" })} //in the case if token is incorrect or user's token is expired

        //before reaching the server,we can modify the incoming request and find or add the userId to it
        req.userId = decoded.id
        next() //move to the next middleware or route handler
    })




}

export default authMiddleware