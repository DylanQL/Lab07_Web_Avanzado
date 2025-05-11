import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './styles.css';

// Componentes de diseño
import Navbar from './components/layout/Navbar';
import Welcome from './components/layout/Welcome';
import BoardAdmin from './components/layout/BoardAdmin';
import BoardModerator from './components/layout/BoardModerator';
import BoardUser from './components/layout/BoardUser';

// Componentes de autenticación
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Profile from './components/auth/Profile';

// Servicios
import AuthService from './services/auth.service';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<any>(null);
  
  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  return (
    <Router>
      <div>
        <Navbar />
        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/welcome" element={
              currentUser ? <Welcome /> : <Navigate to="/login" />
            } />
            <Route 
              path="/user" 
              element={currentUser ? <BoardUser /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/mod" 
              element={
                currentUser && currentUser.roles.includes("ROLE_MODERATOR") 
                  ? <BoardModerator /> 
                  : <Navigate to="/login" />
              } 
            />
            <Route 
              path="/admin" 
              element={
                currentUser && currentUser.roles.includes("ROLE_ADMIN") 
                  ? <BoardAdmin /> 
                  : <Navigate to="/login" />
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
