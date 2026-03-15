import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
export const authMiddleware=(req,res,next)=>{
    const authHeader=req.headers.authorization;
    console.log("Auth header:", authHeader);
    if(!authHeader || !authHeader.startsWith("Bearer ")){
        return res.status(401).json({errors: "No token provided"});
    }
    const token=authHeader.split(" ")[1]
    console.log("Token:", token);
    try {
        const decode=jwt.verify(token,process.env.JWT_SECRET)
        console.log("Decoded userId:", decode.id);
        req.userId=decode.id
        next()
    } catch (error) {
        console.log("JWT verify error:", error.message);
    return res.status(401).json({
        error: "Invalid token"
    });
}
}