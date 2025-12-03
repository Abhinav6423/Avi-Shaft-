import User from "../modals/User.modal.js";
import UserStats from "../modals/UserStats.modal.js";

// Detect environment
const isProduction = process.env.NODE_ENV === "production";

// Helper cookie config
const cookieOptions = {
    httpOnly: true,
    secure: isProduction,                 // HTTPS only on production
    sameSite: isProduction ? "none" : "lax",  // none for prod, lax for localhost
    maxAge: 24 * 60 * 60 * 1000,
    path: "/"
};

export const registerUser = async (req, res) => {
    try {
        const { username, email, password, profilePic } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ success: false, message: "Please enter all fields" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        const user = new User({ username, email, password, profilePic });
        await user.save();

        const userStats = await UserStats.create({ userId: user._id });
        if (!userStats) {
            return res.status(400).json({ success: false, message: "Error creating user stats account" });
        }

        const accessToken = user.generateToken();

        res.cookie("access_token", accessToken, cookieOptions);

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                profilePic: user.profilePic,
            },
            token: accessToken,
        });

    } catch (error) {
        console.error("Error registering user:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Please enter all fields" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        const accessToken = user.generateToken();

        res.cookie("access_token", accessToken, cookieOptions);

        return res.status(200).json({
            success: true,
            message: "User logged in successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                profilePic: user.profilePic,
            },
            token: accessToken,
        });

    } catch (error) {
        console.error("Error logging in user:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export const logoutUser = async (req, res) => {
    try {
        res.clearCookie("access_token", { path: "/" });
        res.status(200).json({ success: true, message: "User logged out successfully" });
    } catch (error) {
        console.error("Error logging out user:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export const me = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        return res.status(200).json({
            success: true,
            message: "User details fetched successfully",
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                profilePic: user.profilePic,
                level: user.level,
                totalXpGained: user.totalXpGained,
                xpToNextLevel: user.xpToNextLevel
            },
        });

    } catch (error) {
        console.error("Error fetching user details:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export const getUserStats = async (req, res) => {
    try {
        const userStats = await UserStats.findOne({ userId: req.user._id }).lean();

        if (!userStats) {
            return res.status(400).json({ success: false, message: "User stats not found" });
        }

        return res.status(200).json({
            success: true,
            message: "User stats fetched successfully",
            data: {
                totalProjects: userStats.totalProjects,
                totalQuickNotes: userStats.totalQuickNotes,
                totalLearnings: userStats.totalLearnings,
                totalHabits: userStats.totalHabits
            }
        });

    } catch (error) {
        console.error("Error fetching user stats:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};
