import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import ChoiceList from './components/ChoiceList';
import AvailableColleges from './components/AvailableColleges';
import TakeQuiz from './components/TakeQuiz';
import Login from './components/Login';
import Signup from './components/Signup'; 
import { ToastContainer } from 'react-toastify';
import Profile from './components/Profile';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/choice-list" element={<ChoiceList />} />
        <Route path="/available-colleges" element={<AvailableColleges />} />
        <Route path="/take-quiz" element={<TakeQuiz />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />

        {/* Add other routes as needed */}
      </Routes>
      <ToastContainer />
    </Router>
  );
};

export default App;
