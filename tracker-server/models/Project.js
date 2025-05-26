import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    ownerId: { type: String, required: true },
    tags: { type: [String], default: [] },
});

export default mongoose.model("Project", ProjectSchema);