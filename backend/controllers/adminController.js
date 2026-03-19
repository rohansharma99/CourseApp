import { Admin } from "../models/adminModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { z } from "zod";
dotenv.config()

export const singup=async(req,res)=>{
    try {
        console.log("Signup request body:", req.body);
    const {firstName,lastName,email,password}=req.body
//validation
    if(!firstName || !lastName || !email || !password){
        return res.status(400).json({
            error:"All fields are required",
        })
    }
   
    const adminSchema=z.object({
        firstName:z.string().min(2,{message:"First name is required"}),
        lastName:z.string().min(2,{message:"Last name is required"}),
        email:z.string().email({message:"Invalid email address"}),
        password:z.string().min(6,{message:"Password must be at least 6 characters long"}),
    })
    const validationResult=adminSchema.safeParse(req.body)
    if(!validationResult.success){
        const errorMessages=validationResult.error.errors.map((err)=>err.message)
        return res.status(400).json({   
            error:errorMessages.join(", "),
        })
    }

//check if admin already exists
         const existingAdmin=await Admin.findOne({email:email})
        if(existingAdmin){
        return res.status(400).json({
            error:"Admin already exists",
        })
    }
     //hashing password 

        var salt =bcrypt.genSaltSync(10)
        const hashPassword = await bcrypt.hash(password, salt)

        const newAdmin=new Admin({
            firstName,
            lastName,
            email,
            password:hashPassword,
        })
        await newAdmin.save()
        res.json({
            message:"Admin created successfully",
            user:newAdmin,
        })     
    } catch (error) {
        res.status(500).json({
            error:error.message,    
     })
    }
}
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await Admin.findOne({ email }).select("+password"); // ✅ Fix 1
    if (!admin) {                                                      // ✅ Fix 2
      return res.status(400).json({ error: "Invalid credentials" });
    }
    const isPasswordValid = await bcrypt.compare(password, admin.password); // ✅ Fix 3
    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid credentials" });
    }
    const token = jwt.sign(
      { id: admin._id },
      process.env.JWT_ADMIN_PASSWORD,
      { expiresIn: "10w" }
    );
    const cookieOptions = {
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Strict",
    };
    res.cookie("token", token, cookieOptions);
    admin.password = undefined;                                        // ✅ Fix 4
    return res.status(200).json({                                      // ✅ Fix 5
      message: "Login successful",
      admin,
      token,
    });
  } catch (error) {
    console.error("ADMIN LOGIN ERROR:", error.message);
    return res.status(500).json({ error: error.message });
  }
};
export const logout=async(req,res)=>{
    try {
        if (!req.cookies || !req.cookies.token) {
            return res.status(400).json({
                error: "No token found in cookies",
                "kindly login first": "Please log in to access this resource"
            });
        }
        res.clearCookie("token")
    res.json({
        message:"Logout successful",
    })
    } catch (error) {
        
    }
    
    
}