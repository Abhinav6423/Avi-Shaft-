import jwt from "jsonwebtoken";
import User from "../modals/User.modal.js";
export const verifyToken = async (req, res, next) => {
    try {
        const token = req.cookies.access_token;
        if (!token) return res.status(401).json({ message: "Unauthorized 1" });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded) return res.status(401).json({ message: "Unauthorized 2" });

        const user = await User.findById(decoded.id);
        if (!user) return res.status(401).json({ message: "Unauthorized 3" });
        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ message: "Unauthorized 4" });
    }
};