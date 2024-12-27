import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    password: { type: String, required: true },
    organization: { type: [String], default: [] },
    role: { type: [String], default: ["user"] }
});

export default mongoose.model("User", UserSchema);