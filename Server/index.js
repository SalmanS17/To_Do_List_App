const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Import Todo model
const TodoModel = require("./Model/Todo");

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/To_Do_List", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1); // Exit if MongoDB fails to connect
  });

// Read all todos
app.get("/get", (req, res) => {
  TodoModel.find()
    .then((result) => res.json(result))
    .catch((err) => {
      console.error("Error fetching todos:", err);
      res.status(500).json({ error: "Unable to fetch todos" });
    });
});

// Create a new todo
app.post("/add", (req, res) => {
  const { task } = req.body;
  
  if (!task) {
    return res.status(400).json({ error: "Task field is required" });
  }

  TodoModel.create({ task })
    .then((result) => {
      console.log("Inserted task:", result);
      res.status(201).json(result); // Status 201 for resource creation
    })
    .catch((err) => {
      console.error("Error inserting task:", err);
      res.status(500).json({ error: "Failed to insert task" });
    });
});

// Update an existing todo (toggle done status)
app.put("/update/:id", (req, res) => {
  const { id } = req.params;
  const { done } = req.body; // Receive 'done' status from frontend

  TodoModel.findByIdAndUpdate(id, { done: done }, { new: true })
    .then((result) => {
      if (!result) {
        return res.status(404).json({ error: "Todo not found" });
      }
      console.log("Updated todo:", result);
      res.json(result);
    })
    .catch((err) => {
      console.error("Error updating todo:", err);
      res.status(500).json({ error: "Failed to update todo" });
    });
});

// Delete a todo
app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;

  TodoModel.findByIdAndDelete(id)
    .then((result) => {
      if (!result) {
        return res.status(404).json({ error: "Todo not found" });
      }
      console.log("Deleted todo:", result);
      res.json({ message: "Todo deleted successfully" });
    })
    .catch((err) => {
      console.error("Error deleting todo:", err);
      res.status(500).json({ error: "Failed to delete todo" });
    });
});

// Start the server
app.listen(3001, () => {
  console.log("Server is running on port 3001...");
});
