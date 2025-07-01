import React, { useState, useEffect } from "react";
import axios from "axios";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [dueDate, setDueDate] = useState("");

  // ✅ Fetch tasks from backend
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/tasks");
        setTasks(res.data);
      } catch (err) {
        console.error("❌ Error fetching tasks:", err);
      }
    };
    fetchTasks();
  }, []);

  // ✅ Add new task
  const addTask = async () => {
    if (!newTitle.trim()) return;
    try {
      await axios.post("http://localhost:4000/api/tasks", {
        title: newTitle,
        dueDate,
      });
      const updated = await axios.get("http://localhost:4000/api/tasks");
      setTasks(updated.data);
      setNewTitle("");
      setDueDate("");
    } catch (err) {
      console.error("❌ Error adding task:", err.message);
    }
  };

  // ✅ Delete task
  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/tasks/${id}`);
      const updated = await axios.get("http://localhost:4000/api/tasks");
      setTasks(updated.data);
    } catch (err) {
      console.error("❌ Error deleting task:", err.message);
    }
  };

  // ✅ Toggle completed
  const toggleComplete = async (id, status) => {
    try {
      await axios.put(`http://localhost:4000/api/tasks/${id}`, {
        completed: status,
      });
      const updated = await axios.get("http://localhost:4000/api/tasks");
      setTasks(updated.data);
    } catch (err) {
      console.error("❌ Error toggling task:", err.message);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>📝 My Task Manager</h1>

      <div style={styles.inputRow}>
        <input
          type="text"
          placeholder="Enter task..."
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          style={styles.input}
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          style={styles.input}
        />
        <button onClick={addTask} style={styles.button}>
          ➕ Add Task
        </button>
      </div>

      <div style={styles.taskList}>
        {tasks.map((task) => {
          const isOverdue =
            task.dueDate &&
            !task.completed &&
            new Date(task.dueDate) < new Date();

          return (
            <div key={task._id} style={styles.taskCard}>
              <div style={styles.taskInfo}>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() =>
                    toggleComplete(task._id, !task.completed)
                  }
                  style={styles.checkbox}
                />
                <div>
                  <span
                    style={{
                      ...styles.taskTitle,
                      textDecoration: task.completed
                        ? "line-through"
                        : "none",
                      color: task.completed ? "#aaa" : "#000",
                    }}
                  >
                    {task.title}
                  </span>
                  {task.dueDate && (
                    <div
                      style={{
                        fontSize: "12px",
                        color: isOverdue ? "red" : "#555",
                      }}
                    >
                      📅 Due:{" "}
                      {new Date(task.dueDate).toLocaleDateString()}
                    </div>
                  )}
                </div>
              </div>
              <button
                onClick={() => deleteTask(task._id)}
                style={styles.deleteButton}
              >
                🗑️
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "600px",
    margin: "40px auto",
    padding: "20px",
    borderRadius: "10px",
    backgroundColor: "#f5f5f5",
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
    fontFamily: "'Segoe UI', sans-serif",
  },
  title: {
    textAlign: "center",
    color: "#333",
    marginBottom: "30px",
  },
  inputRow: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginBottom: "20px",
  },
  input: {
    padding: "10px 15px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  button: {
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    fontSize: "16px",
    borderRadius: "5px",
    cursor: "pointer",
  },
  taskList: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  taskCard: {
    padding: "15px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  taskInfo: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  checkbox: {
    transform: "scale(1.4)",
    accentColor: "#007bff",
  },
  taskTitle: {
    fontSize: "16px",
    fontWeight: "500",
  },
  deleteButton: {
    backgroundColor: "transparent",
    border: "none",
    fontSize: "20px",
    cursor: "pointer",
    color: "#d11a2a",
  },
};

export default Dashboard;
