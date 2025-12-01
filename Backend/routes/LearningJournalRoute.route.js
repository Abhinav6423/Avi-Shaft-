
import { createLearningJournal, getAllLearnings, openLearningJournal } from "../controllers/LearningJournal.controller.js";
import { verifyToken } from "../middlewares/verifyToken.middleware.js";
import express from "express";
const router = express.Router();


router.post("/create", verifyToken, createLearningJournal);
router.get("/all", verifyToken, getAllLearnings);
router.get("/openjournal/:journalId", verifyToken, openLearningJournal);


export default router