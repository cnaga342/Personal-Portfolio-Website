require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db.js");

const app = express();
const PORT = process.env.PORT || 9080;
const DB_URL = process.env.MONGO_URL;

// Connect to MongoDB
connectDB(DB_URL);

// Middleware
app.use(express.json()); // Parses incoming JSON requests
app.use(cors()); // Enable CORS for cross-origin requests

// Routes
app.use("/admin", require("./routes/admin"));
app.use("/messages", require("./routes/messages"));
app.use("/projects", require("./routes/projects"));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
