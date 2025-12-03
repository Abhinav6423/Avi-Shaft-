import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./dbconfig/dbConnect.js";
dotenv.config();

const app = express();

// Detect environment
const isProduction = process.env.NODE_ENV === "production";

// Allowed origins for CORS
const allowedOrigins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "https://avi-shaft.vercel.app",
    "https://avi-shaft.vercel.app/",
    "https://avi-shaft-git-main-abhinav-pandeys-projects-3d126576.vercel.app"
];

// CORS setup
app.use(
    cors({
        origin: function (origin, callback) {
            if (!origin) return callback(null, true); // Postman / curl no-origin support
            if (allowedOrigins.includes(origin)) return callback(null, true);
            return callback(new Error("Not allowed by CORS: " + origin));
        },
        credentials: true,
    })
);

// Required for cookies
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());

// QuickNote Routes
import quickNoteRoutes from "./routes/QuickNote.route.js";
app.use("/api/quicknote", quickNoteRoutes);

// Learning Journal Routes
import learningJournalRoutes from "./routes/LearningJournalRoute.route.js";
app.use("/api/learningjournal", learningJournalRoutes);

// User Auth Routes
import userRoutes from "./routes/user.routes.js";
app.use("/api/auth", userRoutes);

// Default Route
app.get("/", (req, res) => {
    res.send("Server is running...");
});

// Connect DB
connectDB();

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
