import express from "express";
import { registerUser, loginUser, logoutUser, me, getUserStats } from "../controllers/Authentication.controller.js";
import { verifyToken } from "../middlewares/verifyToken.middleware.js";
const router = express.Router();


router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", verifyToken, logoutUser);
router.get("/me", verifyToken, me);
router.get("/userStats", verifyToken, getUserStats);

export default router