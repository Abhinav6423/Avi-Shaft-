import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const connectionInstace = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected: ${connectionInstace.connection.host}`);
    } catch (error) {
        console.log(`Error: ${error.message}`.red.underline.bold);
        process.exit(1);
    }
}


