import Event from "../models/eventModel.js";
import catchAsync from "../utilities/catchAsync.js";
import AppError from "../utilities/appError.js";
import filterBody from "../utilities/filterBody.js";

export const getAllEvents = catchAsync(async (req, res, next) => {
    const { page, limit } = req.query;
    if (!page || !limit) {
        return next(new AppError("Please provide page and limit", 400));
    }
    const skip = (page - 1) * limit;
    const events = await Event.find().skip(skip).limit(limit);
    res.status(200).json({
        status: "success",
        results: events.length,
        data: {
            events,
        },
    });
});

export const getEventById = catchAsync(async (req, res, next) => {
    const event = await Event.findById(req.params.id);
    if (!event) {
        return next(new AppError("No event found with that ID", 404));
    }
    res.status(200).json({
        status: "success",
        data: {
            event,
        },
    });
});

export const createEvent = catchAsync(async (req, res, next) => {
    req.body = filterBody(
        req.body,
        "name",
        "description",
        "Category",
        "date",
        "images",
        "venue",
        "price"
    );
    if (req.files) {
        req.body.images = req.files.map((file) => file.path);
    }
    const event = await Event.create(req.body);
    res.status(201).json({
        status: "success",
        data: {
            event,
        },
    });
});

export const updateEvent = catchAsync(async (req, res, next) => {
    req.body = filterBody(
        req.body,
        "name",
        "description",
        "date",
        "time",
        "location",
        "images",
        "venue",
        "price",
        "participants"
    );
    if (req.files) {
        req.body.images = req.files.map((file) => file.path);
    }
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });

    if (!event) {
        return next(new AppError("No event found with that ID", 404));
    }

    res.status(200).json({
        status: "success",
        data: {
            event,
        },
    });
});

export const deleteEvent = catchAsync(async (req, res, next) => {
    const event = await Event.findByIdAndDelete(req.params.id);

    if (!event) {
        return next(new AppError("No event found with that ID", 404));
    }

    res.status(204).json({
        status: "success",
        data: null,
    });
});

export const bookEvent = catchAsync(async (req, res, next) => {
    const event = await Event.findById(req.params.id);

    if (!event) {
        return next(new AppError("No event found with that ID", 404));
    }

    if (event.participants.includes(req.user._id)) {
        return next(new AppError("You have already booked this event", 400));
    }

    event.participants.push(req.user._id);
    await event.save();

    res.status(200).json({
        status: "success",
        message: "Event booked successfully",
    });
});
