import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
export const adminMiddleware=(req,res,next)=>{
    const authHeader=req.headers.authorization;
    if(!authHeader || !authHeader.startsWith("Bearer ")){
        return res.status(401).json({errors: "No token provided"});
    }
    const token=authHeader.split(" ")[1]
    // console.log("Token:", token);
    try {
        const decode=jwt.verify(token,process.env.JWT_ADMIN_PASSWORD)
        req.adminId=decode.id
        // console.log("Decoded userId:", req.userId);
        next()
    } catch (error) {
        res.status(500).json({
            error:error.message,
        })
    }
}