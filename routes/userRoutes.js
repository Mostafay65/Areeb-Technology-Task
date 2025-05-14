import express from "express";
import authorize from "../middleware/authorize.js";
import { getUser } from "../controllers/userController.js";

const router = express.Router();

router.get("/me", authorize(), getUser);

export default router;
