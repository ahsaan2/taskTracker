import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav style={{ padding: '10px', backgroundColor: '#eee', marginBottom: '20px' }}>
      <Link to="/signup" style={{ margin: '0 10px' }}>Signup</Link>
      <Link to="/login" style={{ margin: '0 10px' }}>Login</Link>
      <Link to="/projects" style={{ margin: '0 10px' }}>Projects</Link>
      <Link to="/tasks" style={{ margin: '0 10px' }}>Tasks</Link>
    </nav>
  );
}
