import express from 'express'
import { login,singup,logout } from '../controllers/adminController.js'
const router=express.Router()

router.post('/signup',singup)
router.post('/login',login)
router.get("/logout",logout)


export default router;