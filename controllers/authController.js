import User from "../models/userModel.js";
import AppError from "../utilities/appError.js";
import catchAsync from "../utilities/catchAsync.js";
import sendTokenResponse from "../utilities/sendTokenResponse.js";
import filterBody from "../utilities/filterBody.js";
import httpStatusText from "../helpers/httpStatusText.js";

export const signup = catchAsync(async (req, res, next) => {
    const filteredBody = filterBody(
        req.body,
        "email",
        "phoneNumber",
        "name",
        "profilePicture",
        "password"
    );

    const user = await User.create([filteredBody]);
    sendTokenResponse(user, 200, res);
});

export const Login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new AppError("Please provide email and password", 400));
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.correctPassword(password))) {
        return next(new AppError("Invalid email or password.", 401));
    }

    sendTokenResponse(user, 200, res);
});
