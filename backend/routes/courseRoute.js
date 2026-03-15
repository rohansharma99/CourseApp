import express from 'express'
import { buyCourse, createCourse, deleteCourse, getAllCourses, getCourseById, updateCourse } from '../controllers/courseController.js';
import { authMiddleware } from '../middleware/auth.js';
import { adminMiddleware } from '../middleware/adminAuth.js';

const router=express.Router()
console.log("courseRoute module loaded");
router.post('/create',adminMiddleware, createCourse);
router.put("/update/:courseId",adminMiddleware,updateCourse)
router.delete("/delete/:courseId",adminMiddleware,deleteCourse)
router.get("/getAll",getAllCourses)
router.get("/getCourse/:courseId",getCourseById)
router.post("/buy/:courseId",authMiddleware,buyCourse)
export default router;