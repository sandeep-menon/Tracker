import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function register (req, res) {
    const { name, email, password, firstName, lastName } = req.body;
    try {
        let userWithEmail = await User.findOne({ email });
        if (userWithEmail) {
            return res.status(409).json({ type: "error", message: "User with email id already exists" });
        }
        let userWithName = await User.findOne({ name });
        if (userWithName) {
            return res.status(409).json({ type: "error", message: "User with same name already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new User({ name, email, password: hashedPassword, firstName, lastName });
        await user.save();

        res.status(201).json({ type: "success", message: "User registered successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export async function login (req, res) {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ type: "error", message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ type: "error", message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.json({token});
    } catch (err) {
        res.status(500).json({ type: "error", message: err.message });
    }
}

export async function getProfile(req, res) {
    try {
        const user = await User.findById(req.user.id).select("-password");
        res.json(user);
    } catch (err) {
        res.status(500).json({ type: "error", message: err.message });
    }
}

export async function getUserById(req, res) {
    try {
        const user = await User.findById(req.user.id).select("-password");
        res.json(user);
    } catch (err) {
        res.status(500).json({ type: "error", message: err.message });
    }
}