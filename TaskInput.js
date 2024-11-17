import React, { useState } from 'react';

function TaskInput({ addTask }) {
  const [taskTitle, setTaskTitle] = useState('');
  const [deadline, setDeadline] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation for title and deadline
    if (!taskTitle.trim() || !deadline || new Date(deadline) <= new Date()) {
      alert("Please provide a valid task title and a future deadline.");
      return;
    }

    // Add task and reset input fields
    addTask({ title: taskTitle.trim(), completed: false, priority: '', deadline });
    setTaskTitle('');
    setDeadline('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="input-group">
        {/* Task Title Input */}
        <input
          type="text"
          className="form-control"
          placeholder="Enter task"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
        />
        {/* Deadline Input */}
        <input
          type="datetime-local"
          className="form-control"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          placeholder="Set a deadline"
        />
        {/* Submit Button */}
        <button type="submit" className="btn btn-primary">
          Add Task
        </button>
      </div>
    </form>
  );
}

export default TaskInput;    