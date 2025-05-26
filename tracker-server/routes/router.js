import express from "express";
const router = express.Router();
import authenticate from "../middleware/auth.js";

import { login, register, getProfile, getUserById, createProject } from "../controllers/authController.js";

router.post("/register", register);
router.post("/login", login);
router.get("/profile", authenticate, getProfile);
router.get("/user", authenticate, getUserById);
router.post("/new-project", authenticate, createProject);

export default router;