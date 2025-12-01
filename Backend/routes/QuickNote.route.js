import { createQuickNote, getAllQuickNotes, deleteQuickNote , openNote } from "../controllers/QuickNote.controller.js";
import express from "express";
import { verifyToken } from "../middlewares/verifyToken.middleware.js";
const router = express.Router();

router.post("/create", verifyToken, createQuickNote);
router.get("/all", verifyToken, getAllQuickNotes);
router.delete("/delete/:noteId", verifyToken, deleteQuickNote);
router.get("/singleNote/:noteId", verifyToken, openNote);

export default router