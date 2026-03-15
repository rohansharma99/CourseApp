import express from "express";
import { orderData } from "../controllers/orderController.js";
import  { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

router.post("/", authMiddleware, orderData);

export default router;
