const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    technologies: { type: String },
    githubLink: { type: String },
    liveDemo: { type: String },
    image: { type: String },
  },
  {
    collection: "Project", // Exact collection name in DB
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
