import mongoose, { Schema } from "mongoose";
import validator from "validator";
import crypto from "crypto";
import bcrypt from "bcrypt";
import roles from "../helpers/roles.js";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Email is required."],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, "Please provide a valid email address."],
    },
    phoneNumber: {
        type: String,
        validate: [validator.isMobilePhone, "Please provide a valid phone number."],
    },
    name: {
        type: String,
        required: [true, "user Name is required."],
    },
    bio: String,
    profilePicture: String,

    role: {
        type: [String],
        enum: {
            values: Object.values(roles),
            message: `Role is either: ${Object.values(roles).join(", ")}.`,
        },
        default: [roles.user],
    },
    password: {
        type: String,
        required: [true, "Password is required."],
        minlength: [8, "Password must be at least 8 characters."],
        select: false,
    },
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 12);

    next();
});

userSchema.methods.correctPassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
