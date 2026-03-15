import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import mongoose from 'mongoose'
import fileUpload from 'express-fileupload'
import courseRoute from "./routes/courseRoute.js"
import userRoute from "./routes/userRoute.js"
import { v2 as cloudinary } from "cloudinary";
import adminRoute from "./routes/adminRoute.js"
import orderRoute from "./routes/orderRoute.js";
const app=express()
dotenv.config()
console.log("JWT_SECRET set:", !!process.env.JWT_SECRET);

//middleware
app.use(express.json())
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5175",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  exposedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 200 //some legacy browsers (IE11, various SmartTVs) choke on 204
}))

const port = process.env.PORT || 3000;
const DB_URL = process.env.MONGODB_URL || "mongodb://localhost:27017/course-app";

// console.log("Database URL:", DB_URL);
console.log("Port:", port);

(async () => {
  try {
    await mongoose.connect(DB_URL);
    console.log("connected successfully")
  } catch (error) {
    console.log("connection failed:", error.message)
  }
})();

//defing routes 
app.use('/api/v1/Course', courseRoute)
app.use('/api/v1/User', userRoute)
app.use('/api/v1/Admin',adminRoute)
app.use("/api/v1/order", orderRoute);

//cloudnairy

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
})
// console.log(process.env.CLOUD_NAME, process.env.API_KEY, process.env.API_SECRET);

app.listen(port,()=>{
    console.log(`Server is running on ${port}`)
})