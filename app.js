import express from "express";
import cors from "cors";
import corsOptions from "./configurations/corsOptions.js";
import cookieParser from "cookie-parser";
import globalErrorHandler from "./controllers/errorController.js";
import AppError from "./utilities/appError.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";

export const app = express();

app.use(cors(corsOptions));
app.use(cookieParser());

// Body parser
app.use(express.json());

// Routes
app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/events", eventRoutes);

// Undefined routes
app.all("/", (req, res, next) => {
    next(new AppError(`Can not find ${req.originalUrl} on this server.`, 404));
});

// Manage all errors
app.use(globalErrorHandler);
