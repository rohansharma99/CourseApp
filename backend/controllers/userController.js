import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { z } from "zod";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Purchase } from "../models/purchaseModel.js";
import { Course } from "../models/courseModel.js";
dotenv.config()

export const singup=async(req,res)=>{
    try {
    const {firstName,lastName,email,password}=req.body
//validation
    if(!firstName || !lastName || !email || !password){
        return res.status(400).json({
            error:"All fields are required",
        })
    }
   
    const userSchema=z.object({
        firstName:z.string().min(2,{message:"First name is required"}),
        lastName:z.string().min(2,{message:"Last name is required"}),
        email:z.string().email({message:"Invalid email address"}),
        password:z.string().min(6,{message:"Password must be at least 6 characters long"}),
    })
    const validationResult=userSchema.safeParse(req.body)
    if(!validationResult.success){
        const errorMessages=validationResult.error.errors.map((err)=>err.message)
        return res.status(400).json({   
            error:errorMessages.join(", "),
        })
    }

//check if user already exists
         const existingUser=await User.findOne({email:email})
        if(existingUser){
        return res.status(400).json({
            error:"User already exists",
        })
    }
     //hashing password 

        var salt =bcrypt.genSaltSync(10)
        const hashPassword = await bcrypt.hash(password, salt)

        const newUser=new User({
            firstName,
            lastName,
            email,
            password:hashPassword,
        })
        await newUser.save()
        res.json({
            message:"User created successfully",
            user:newUser,
        })     
    } catch (error) {
        res.status(500).json({
            error:error.message,    
     })
    }
}
export const login=async(req,res)=>{
const {email,password}=req.body
try {
    const user=await User.findOne({email:email})
        const isPasswordValid=await bcrypt.compare(password,user.password)
        if(!isPasswordValid || !user){
            return res.status(400).json({
                error:"Invalid credentials",
            })
        }

  // Generate JWT token
    const token=jwt.sign({
        id:user._id,
    },
    process.env.JWT_SECRET,
    {expiresIn:"10weeks"}
    )  
    const cookieOptions={
        expires:new Date(Date.now()+7*24*60*60*1000), //7 days
        httpOnly:true, //cookie cannot be accessed by client-side by JavaScript
        secure:process.env.NODE_ENV==="production", //true for https and false for http
        sameSite:"strict",
    }
    res.cookie("token",token,cookieOptions); 

    res.status(201).json({
        message:"Login successful",
        user,
        token,
        cookieOptions,
    })

    
} catch (error) {
    res.status(500).json({
        error:error.message,    
 }) 
}
}
export const logout=async(req,res)=>{
    
    res.clearCookie("token")
    res.json({
        message:"Logout successful",
    })
}
export const purchaseCourse=async(req,res)=>{
    const userId=req.userId

    try {
        const puchased=await Purchase.find({userId})
        let purchasedCourseIds=[];
        for(let i=0;i<puchased.length;i++){
            purchasedCourseIds.push(puchased[i].courseId)

           
        }
         const courseData = await Course.find({
                _id: { $in: purchasedCourseIds }
            })
            res.json({
                message:"Purchased courses fetched successfully",
                courses:courseData,
            })
    } catch (error) {
        res.status(501).json({
            error:error.message,
        })
        
    }
}
