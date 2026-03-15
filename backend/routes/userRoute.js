import express from 'express'
import { login, logout, purchaseCourse, singup } from '../controllers/userController.js';
import { authMiddleware } from '../middleware/auth.js';

const router=express.Router()

router.post('/signup',singup)
router.post('/login',login)
router.get("/logout",logout)
router.get("/purchase",authMiddleware,purchaseCourse)
export default router;