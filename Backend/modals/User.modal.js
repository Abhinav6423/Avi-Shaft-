import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        profilePic: {
            type: String,
            default: ""
        },
        totalXpGained: {
            type: Number,
            default: 0
        },
        level: {
            type: Number,
            default: 1,
        },
        xpToNextLevel : {
            type : Number,
            default : 100
        }
    },
    {
        timestamps: true
    }
)

//hashing the password before saving it to db
userSchema.pre("save", async function () {
    const salt = await bcrypt.genSalt(10)
    if (!this.isModified("password")) {
        return
    }

    this.password = await bcrypt.hash(this.password, salt)
    return

})


//compare the entered password with the one stored in db
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}


//token generation

userSchema.methods.generateToken = function () {
    const token = jwt.sign(
        {
            id: this._id
        },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    )

    return token;
}

// LEVEL UP HOOK
const XP_PER_LEVEL = 100;

userSchema.post("save", async function (doc) {
    try {
        const newLevel = Math.floor(doc.totalXpGained / XP_PER_LEVEL) + 1;

        // Only update if level needs to increase
        if (newLevel !== doc.level) {
            await mongoose.model("User").updateOne(
                { _id: doc._id },
                { level: newLevel }
            );
        }
    } catch (error) {
        console.log("Level update error:", error);
    }
});






const User = mongoose.model("User", userSchema)
export default User