import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [name, setName] = useState("");

  const token = localStorage.getItem('token');

  const fetchProjects = async () => {
    const res = await axios.get('http://localhost:5000/api/projects', {
      headers: { Authorization: `Bearer ${token}` }
    });
    setProjects(res.data);
  };

  const createProject = async () => {
    await axios.post('http://localhost:5000/api/projects', { name }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setName("");
    fetchProjects();
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Your Projects</h2>
      <input
        placeholder="Project Name"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <button onClick={createProject}>Add Project</button>

      <ul style={{ marginTop: '20px' }}>
        {projects.map(p => (
          <li key={p._id}>{p.name}</li>
        ))}
      </ul>
    </div>
  );
}
