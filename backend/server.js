const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

// ✅ Load environment variables from .env
dotenv.config();

// ✅ Create Express app
const app = express();

// ✅ Middleware
app.use(cors()); // Enable CORS for all origins
app.use(express.json()); // Parse incoming JSON

// ✅ Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ MongoDB connected");
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
  });

// ✅ Import task routes
const taskRoutes = require("./routes/tasks");

// ✅ Use task routes
app.use("/api/tasks", taskRoutes);

// ✅ Basic test route
app.get("/", (req, res) => {
  res.send("🟢 API is working! Welcome to Venuja's Task Manager");
});

// ✅ Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
