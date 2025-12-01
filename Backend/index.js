import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./dbconfig/dbConnect.js";
import cookieParser from "cookie-parser";
dotenv.config();

const app = express();

// Middlewares
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());

// QuickNote Routes
import quickNoteRoutes from "./routes/QuickNote.route.js"
app.use("/api/quicknote", quickNoteRoutes);

// Learning Journal Routes
import learningJournalRoutes from "./routes/LearningJournalRoute.route.js"
app.use("/api/learningjournal", learningJournalRoutes);

// User Routes
import userRoutes from "./routes/user.routes.js";
app.use("/api/auth", userRoutes);

// Default Route
app.get("/", (req, res) => {
    res.send("Server is running...");
});

connectDB();

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    // console.log("JWT_SECRET:", process.env.JWT_SECRET);

});
