import express from "express";
import {
    createEvent,
    updateEvent,
    deleteEvent,
    getAllEvents,
    bookEvent,
    getEventById,
} from "../controllers/eventController.js";
import authorize from "../middleware/authorize.js";
import imageUploader from "../middleware/imageUploader.js";
import roles from "../helpers/roles.js";

const router = express.Router();

// User routes
router.get("/", getAllEvents);
router.get("/:id", getEventById);
router.post("/:id/book", authorize(roles.user), bookEvent);

// Admin routes
router.post("/", authorize(roles.admin), imageUploader.array("images", 5), createEvent);
router.patch("/:id", authorize(roles.admin), imageUploader.array("images", 5), updateEvent);
router.delete("/:id", authorize(roles.admin), deleteEvent);

export default router;
