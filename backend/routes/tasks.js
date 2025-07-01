const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// ✅ Define Task Schema with dueDate
const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  dueDate: {
    type: Date,
    default: null,
  },
});

// ✅ Create Task Model
const Task = mongoose.model("Task", taskSchema);

// ✅ GET all tasks
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find(); // Fetch all tasks
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});

// ✅ POST new task with optional dueDate
router.post("/", async (req, res) => {
  try {
    const { title, dueDate } = req.body;
    const newTask = new Task({ title, dueDate });
    await newTask.save();
    res.json(newTask);
  } catch (err) {
    res.status(500).json({ error: "Failed to add task" });
  }
});

// ✅ PUT: Update completed status
router.put("/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { completed: req.body.completed },
      { new: true }
    );
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: "Failed to update task" });
  }
});

// ✅ DELETE a task
router.delete("/:id", async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete task" });
  }
});

module.exports = router;
