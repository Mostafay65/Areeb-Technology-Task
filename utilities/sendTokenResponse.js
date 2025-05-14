import jwt from "jsonwebtoken";
import httpStatusText from "../helpers/httpStatusText.js";

const sendTokenResponse = (user, statusCode, res, message) => {
    const accessToken = jwt.sign(
        {
            userInfo: {
                id: user._id,
                name: user.name,
                role: user.role,
            },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN }
    );

    res.status(statusCode).json({
        status: httpStatusText.SUCCESS,
        message,
        accessToken,
    });
};

export default sendTokenResponse;
