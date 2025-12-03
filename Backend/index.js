import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./dbconfig/dbConnect.js";

dotenv.config();
const app = express();

// Allowed frontend URLs
const allowedOrigins = [
    "http://localhost:5173",
    "https://avi-shaft.vercel.app",
];

// ************ FIXED CORS ************
app.use((req, res, next) => {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader("Access-Control-Allow-Origin", origin);
    }
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");

    if (req.method === "OPTIONS") {
        return res.sendStatus(200);
    }
    next();
});

app.use(
    cors({
        origin: allowedOrigins,
        credentials: true,
    })
);

app.use(express.json({ limit: "20mb" }));
app.use(cookieParser());

// Routes
import quickNoteRoutes from "./routes/QuickNote.route.js";
import learningJournalRoutes from "./routes/LearningJournalRoute.route.js";
import userRoutes from "./routes/user.routes.js";

app.use("/api/quicknote", quickNoteRoutes);
app.use("/api/learningjournal", learningJournalRoutes);
app.use("/api/auth", userRoutes);

app.get("/", (req, res) => res.send("Server running..."));

connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server on ${PORT}`));
