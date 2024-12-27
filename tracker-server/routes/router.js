import express from "express";
const router = express.Router();
import authenticate from "../middleware/auth.js";

import { login, register, getProfile, getUserById } from "../controllers/authController.js";

router.post("/register", register);
router.post("/login", login);
router.get("/profile", authenticate, getProfile);
router.get("/user", authenticate, getUserById);

export default router;