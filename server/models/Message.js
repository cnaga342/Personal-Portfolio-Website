const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String },
  },
  {
    collection: "Message", // Exact collection name in DB
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
