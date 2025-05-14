import User from "../models/userModel.js";
import catchAsync from "../utilities/catchAsync.js";

export const getUser = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.user._id);
    if (!user) {
        return res.status(404).json({
            status: "fail",
            message: "User not found",
        });
    }
    res.status(200).json({
        status: "success",
        data: {
            user,
        },
    });
});
