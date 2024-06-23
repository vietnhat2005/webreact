import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css'; // Hoặc thêm nội dung của styles.css
import Dashboard from './components/Dashboard'; // Đảm bảo có Dashboard.jsx tương ứng
import Login from './components/Login'; // Đảm bảo có Login.jsx tương ứng
import Navbar from './components/Navbar'; // Đảm bảo có Navbar.jsx tương ứng
import Register from './components/Register'; // Đây là component mới tạo
import './styles.css';

const App = () => {
    return (
        <Router>
            <div>
                <Navbar />
                <Routes>
                    
                    
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/dashboard" element={<Dashboard/> } />
                </Routes>
            </div>
        </Router>
    );
}

export default App;

