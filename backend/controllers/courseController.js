import { Course } from "../models/courseModel.js";
import { v2 as cloudinary } from "cloudinary";
import { Purchase } from "../models/purchaseModel.js";
import Stripe from "stripe";
import dotenv from "dotenv";
dotenv.config();


export const createCourse = async (req, res) => {
  try {
    const adminId = req.adminId;
    const { title, description, price } = req.body;

    // Validate text fields
    if (!title || !description || !price) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Validate file existence FIRST
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ error: "Image is required" });
    }

    const image = req.files.image;

    if (!image) {
      return res.status(400).json({ error: "Image file missing" });
    }

    // Validate file type
    const allowedFormats = ["image/jpeg", "image/png", "image/jpg"];

    if (!allowedFormats.includes(image.mimetype)) {
      return res
        .status(400)
        .json({ error: "Only jpeg, png and jpg formats are allowed" });
    }

    // Validate temp path
    if (!image.tempFilePath) {
      return res.status(500).json({ error: "Temp file path missing" });
    }

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(
      image.tempFilePath,
      {
        folder: "course-app",
      }
    );

    if (!result?.public_id || !result?.secure_url) {
      return res.status(500).json({ error: "Image upload failed" });
    }

    const course = await Course.create({
      title,
      description,
      price,
      image: {
        public_id: result.public_id,
        url: result.secure_url,
      },
      createdBy: adminId,
    });

    return res.status(201).json({
      message: "Course created successfully",
      course,
    });

  } catch (error) {
    console.log("FULL ERROR:", error);
    return res.status(500).json({
      error: error.message,
    });
  }
};
export const updateCourse = async (req, res) => {
  const { courseId } = req.params;
  const adminId = req.adminId;
  const { title, description, price } = req.body;

  try {
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    course.title = title;
    course.description = description;
    course.price = price;
    course.updatedBy = adminId;

    if (req.files && req.files.image) {
      const image = req.files.image;

      const allowedFormats = ["image/jpeg", "image/png", "image/jpg"];
      if (!allowedFormats.includes(image.mimetype)) {
        return res.status(400).json({ error: "Only jpeg, png and jpg formats are allowed" });
      }

      if (course.image?.public_id) {
        await cloudinary.uploader.destroy(course.image.public_id);
      }

      const result = await cloudinary.uploader.upload(image.tempFilePath, {
        folder: "course-app",
      });

      if (!result?.public_id || !result?.secure_url) {
        return res.status(500).json({ error: "Image upload failed" });
      }

      course.image = {
        public_id: result.public_id,
        url: result.secure_url,
      };
      course.markModified("image");
    }

    await course.save();

    res.status(200).json({
      message: "Course updated successfully",
      course,
    });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
export const deleteCourse=async(req,res)=>{
    const {courseId}=req.params
    const adminId=req.adminId
    try {
        const course=await Course.findOneAndDelete({_id:courseId,
        createdBy:adminId
        })
        if(!course){
            return res.status(404).json({
                error:"Course not found or you are not authorized to delete this course",
            })
        }
        res.json({
            message:"Course deleted successfully",
            _id:courseId,
            course,
            deletedBy:adminId,
        })
    } catch (error) {
        res.status(500).json({
            error:error.message,
            errorIn:"deleteCourse controller",
        })
    }
};
export const getAllCourses=async(req,res)=>{
    try {
        const courses=await Course.find({})
        res.json({
            message:"Courses fetched successfully",
            courses,
        })
    } catch (error) {
            res.status(500).json({  
            error:error.message,
        })
        
    }
};
export const getCourseById=async(req,res)=>{
    const {courseId}=req.params
    try {
        const course=await Course.findById(courseId)
        if(!course){
            return res.status(404).json({
                error:"Course not found",
            })
        }
        res.json({
            message:"Course fetched successfully",
            course,
        })
        
    } catch (error) {
        res.status(500).json({
            error:error.message,
        })
        
    }
};
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
console.log(process.env.STRIPE_SECRET_KEY);

export const buyCourse = async (req, res) => {
  const { userId } = req;
  const { courseId } = req.params;

  try {
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ errors: "Course not found" });
    }
    const existingPurchase = await Purchase.findOne({ userId, courseId });
    if (existingPurchase) {
      return res
        .status(400)
        .json({ errors: "User has already purchased this course" });
    }

    // stripe payment code goes here!!
    const amount = course.price;
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "usd",
      payment_method_types: ["card"],
    });

    res.status(201).json({
      message: "Course purchased successfully",
      course,
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(500).json({ errors: "Error in course buying" });
    console.log("error in course buying ", error);
  }
};