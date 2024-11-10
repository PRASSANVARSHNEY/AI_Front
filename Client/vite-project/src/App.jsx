import './App.css';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'; // Assuming a reusable Navbar component
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import axios from 'axios';
import { Toaster } from 'react-hot-toast';

axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true; // Ensures cookies are sent with requests

function App() {
  return (
    <>
      {/* Toast notifications */}
      <Toaster position="bottom-right" toastOptions={{ duration: 2000 }} />

    

      {/* Routes for page navigation */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default App;
