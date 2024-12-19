import React, { useState } from "react";
import axios from "axios";

function Create() {
  const [task, setTask] = useState("");

  const handleAdd = () => {
    if (!task) {
      alert("Please enter a task.");
      return;
    }

    axios
      .post("http://localhost:3001/add", { task: task })
      .then(() => {
        setTask(""); // Clear input field after successful addition
        window.location.reload(); // A simple way to refresh the page for now
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="create_form">
      <input
        type="text"
        placeholder="Enter Task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button type="button" onClick={handleAdd}>
        Add
      </button>
    </div>
  );
}

export default Create;
