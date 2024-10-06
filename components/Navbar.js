import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-2xl font-bold">EduCounsel</h1>
        <div className="space-x-4">
          <Link to="/" className="text-white hover:bg-gray-700 px-3 py-2 rounded">Home</Link>
          <Link to="/choice-list" className="text-white hover:bg-gray-700 px-3 py-2 rounded">Choice List</Link>
          <Link to="/available-colleges" className="text-white hover:bg-gray-700 px-3 py-2 rounded">Available Colleges</Link>
          <Link to="/take-quiz" className="text-white hover:bg-gray-700 px-3 py-2 rounded">Take Quiz</Link>
          <Link to="/login" className="text-white hover:bg-gray-700 px-3 py-2 rounded">Login</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
