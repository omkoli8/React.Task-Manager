import React, { useState, useEffect } from 'react';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import Topbar from './components/Topbar';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Import Bootstrap JS (includes Popper)

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [sortCriteria, setSortCriteria] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (newTask) => {
    const taskObject = {
      title: newTask.title,
      completed: false,
      priority: '',
      deadline: newTask.deadline,
    };
    setTasks([...tasks, taskObject]); // Add only the task object
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const toggleCompletion = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const updatePriority = (index, priority) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, priority } : task
    );
    setTasks(updatedTasks);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleSort = (criteria) => {
    setSortCriteria(criteria);
  };

  const sortTasks = (tasks) => {
    let sortedTasks = [...tasks];
    if (sortCriteria === 'priority') {
      const priorityOrder = { High: 1, Medium: 2, Low: 3, '': 4 };
      sortedTasks.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
    } else if (sortCriteria === 'completion') {
      sortedTasks.sort((a, b) => a.completed - b.completed);
    } else if (sortCriteria === 'title') {
      sortedTasks.sort((a, b) => a.title.localeCompare(b.title));
    }
    return sortedTasks;
  };

  const sortedTasks = sortCriteria ? sortTasks(tasks) : tasks;

  const filteredTasks = sortedTasks.filter((task) =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <Topbar onSearch={handleSearch} onSort={handleSort} />
      <div className="container mt-5">
        <TaskInput addTask={addTask} />
        <TaskList
          tasks={filteredTasks}
          deleteTask={deleteTask}
          toggleCompletion={toggleCompletion}
          updatePriority={updatePriority}
        />
      </div>
    </div>
  );
}
export default App;