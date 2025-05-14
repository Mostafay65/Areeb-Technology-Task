import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    Category: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    images: {
        type: [String],
        required: true,
    },
    venue: {
        type: String,
        default: false,
    },
    price: {
        type: Number,
        required: true,
    },
    participants: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "User",
    },
});

const Event = mongoose.model("Event", eventSchema);
export default Event;
