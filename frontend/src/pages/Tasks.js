import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Tasks() {
  const [projects, setProjects] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState('');
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState({ title: '', description: '', status: 'Pending' });

  const token = localStorage.getItem('token');

  const fetchProjects = async () => {
    const res = await axios.get('http://localhost:5000/api/projects', {
      headers: { Authorization: `Bearer ${token}` }
    });
    setProjects(res.data);
    if (res.data.length > 0) setSelectedProjectId(res.data[0]._id);
  };

  const fetchTasks = async () => {
    if (!selectedProjectId) return;
    const res = await axios.get(`http://localhost:5000/api/tasks/${selectedProjectId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setTasks(res.data);
  };

  const createTask = async () => {
    await axios.post(`http://localhost:5000/api/tasks`, { ...task, projectId: selectedProjectId }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setTask({ title: '', description: '', status: 'Pending' });
    fetchTasks();
  };

  const updateTask = async (id, updates) => {
    await axios.put(`http://localhost:5000/api/tasks/${id}`, updates, {
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:5000/api/tasks/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchTasks();
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [selectedProjectId]);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Task Manager</h2>

      <label>Choose Project: </label>
      <select value={selectedProjectId} onChange={e => setSelectedProjectId(e.target.value)}>
        {projects.map(p => (
          <option key={p._id} value={p._id}>{p.name}</option>
        ))}
      </select>

      <div style={{ marginTop: '20px' }}>
        <input
          placeholder="Title"
          value={task.title}
          onChange={e => setTask({ ...task, title: e.target.value })}
        />
        <input
          placeholder="Description"
          value={task.description}
          onChange={e => setTask({ ...task, description: e.target.value })}
        />
        <select value={task.status} onChange={e => setTask({ ...task, status: e.target.value })}>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
        <button onClick={createTask}>Add Task</button>
      </div>

      <ul style={{ marginTop: '20px' }}>
        {tasks.map(t => (
          <li key={t._id}>
            <strong>{t.title}</strong> - {t.description} [{t.status}]
            <button onClick={() => updateTask(t._id, { status: 'Completed' })}>✔</button>
            <button onClick={() => deleteTask(t._id)}>🗑</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
