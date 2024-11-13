import express from "express";
import { registerUser, signInUser } from "../controllers/userControllers.js";
const router = express.Router();

router.post("/register", registerUser);
router.post("/sign-in", signInUser);

export default router;
