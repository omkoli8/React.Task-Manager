import React, { useEffect, useState } from 'react';
import './TaskList.css';

function TaskList({ tasks, deleteTask, toggleCompletion, updatePriority }) {
  const priorityOptions = ['Low', 'Medium', 'High'];

  const calculateTimeLeft = (deadline) => {
    if (!deadline) return '';
    const now = new Date();
    const end = new Date(deadline);
    const diff = end - now;

    if (diff <= 0) return 'Time Over';

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);

    return `${days}d ${hours}h ${minutes}m left`;
  };

  const [timeLeft, setTimeLeft] = useState(tasks.map((task) => calculateTimeLeft(task.deadline)));
  const [activeDropdown, setActiveDropdown] = useState(null); // Track the active dropdown

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(tasks.map((task) => calculateTimeLeft(task.deadline)));
    }, 60000); // Update every minute
    return () => clearInterval(interval); // Cleanup on component unmount
  }, [tasks]);

  const handlePriorityChange = (index, priority) => {
    updatePriority(index, priority);
    setActiveDropdown(null); // Close the dropdown after selection
  };

  const handleDropdownToggle = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index); // Toggle the dropdown
  };

  return (
    <ul className="list-group">
      {tasks.map((task, index) => (
        <li
          key={index}
          className={`list-group-item d-flex justify-content-between align-items-center task-item ${
            task.completed ? 'completed' : ''
          }`}
        >
          {/* Task Title and Deadline */}
          <div className="d-flex align-items-center">
            <input
              type="checkbox"
              className="form-check-input me-2"
              checked={task.completed}
              onChange={() => toggleCompletion(index)}
            />
            <div>
              <span
                style={{
                  textDecoration: task.completed ? 'line-through' : 'none',
                  fontWeight: 'bold',
                  marginRight: '15px',
                }}
              >
                {task.title}
              </span>
              <div className="text-muted" style={{ fontSize: '0.9em' }}>
                {task.deadline ? calculateTimeLeft(task.deadline) : 'No Deadline'}
              </div>
            </div>
          </div>

          {/* Actions (Priority Button and Delete) */}
          <div className="d-flex align-items-center">
            {/* Priority Button */}
            <div className="dropdown me-2">
              <button
                className={`btn btn-sm ${
                  task.priority === 'High'
                    ? 'btn-success'
                    : task.priority === 'Medium'
                    ? 'btn-warning'
                    : task.priority === 'Low'
                    ? 'btn-secondary'
                    : 'btn-primary'
                } dropdown-toggle`}
                type="button"
                id={`priorityDropdown-${index}`}
                aria-expanded={activeDropdown === index ? 'true' : 'false'}
                onClick={() => handleDropdownToggle(index)} // Toggle dropdown on click
              >
                {task.priority || 'Set Priority'}
              </button>
              <ul
                className={`dropdown-menu ${activeDropdown === index ? 'show' : ''}`}
                aria-labelledby={`priorityDropdown-${index}`}
              >
                {priorityOptions.map((option) => (
                  <li key={option}>
                    <button
                      className="dropdown-item"
                      onClick={() => handlePriorityChange(index, option)} // Handle priority change
                    >
                      {option}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Delete Button */}
            <button
              className="btn btn-sm btn-danger"
              onClick={() => deleteTask(index)}
              aria-label="Delete"
            >
              <i className="bi bi-trash"></i>
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default TaskList;
