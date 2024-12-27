import express from "express";
import cors from "cors";
import connectDB from "./config/database.js";
import dotenv from "dotenv";
import authRoutes from "./routes/router.js";

dotenv.config();

const PORT = process.env.PORT || 5000;
connectDB();
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", authRoutes);
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});