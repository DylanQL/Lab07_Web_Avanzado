import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { User } from '../../types/auth.types';
import AuthService from '../../services/auth.service';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Navbar: React.FC = () => {
  const [showModeratorBoard, setShowModeratorBoard] = useState<boolean>(false);
  const [showAdminBoard, setShowAdminBoard] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setShowModeratorBoard(user.roles.includes('ROLE_MODERATOR'));
      setShowAdminBoard(user.roles.includes('ROLE_ADMIN'));
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
    setShowModeratorBoard(false);
    setShowAdminBoard(false);
    setCurrentUser(null);
  };

  // Función para mostrar el tipo de usuario actual
  const getUserRoleBadge = () => {
    if (showAdminBoard) {
      return <span className="badge bg-danger ms-2">Administrador</span>;
    } else if (showModeratorBoard) {
      return <span className="badge bg-success ms-2">Moderador</span>;
    } else if (currentUser) {
      return <span className="badge bg-primary ms-2">Usuario</span>;
    }
    return null;
  };

  return (
    <>
      {currentUser && (
        <div className={`role-banner text-center text-white py-1 ${
          showAdminBoard ? 'bg-danger' : 
          showModeratorBoard ? 'bg-success' : 
          'bg-primary'
        }`}>
          <i className={`bi ${
            showAdminBoard ? 'bi-shield-lock-fill' : 
            showModeratorBoard ? 'bi-shield-check' : 
            'bi-person-fill'
          } me-2`}></i>
          Vista actual: {
            showAdminBoard ? 'ADMINISTRADOR' : 
            showModeratorBoard ? 'MODERADOR' : 
            'USUARIO ESTÁNDAR'
          }
        </div>
      )}
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link to={currentUser ? "/welcome" : "/login"} className="navbar-brand">
          Mi Aplicación {getUserRoleBadge()}
        </Link>
      <div className="navbar-nav mr-auto">
        {currentUser && (
          <li className="nav-item">
            <Link to="/welcome" className="nav-link">
              <i className="bi bi-house-door"></i> Inicio
            </Link>
          </li>
        )}

        {showModeratorBoard && (
          <li className="nav-item">
            <Link to="/mod" className="nav-link">
              <i className="bi bi-shield-check"></i> Panel de Moderador
            </Link>
          </li>
        )}

        {showAdminBoard && (
          <li className="nav-item">
            <Link to="/admin" className="nav-link">
              <i className="bi bi-shield-lock-fill"></i> Panel de Administración
            </Link>
          </li>
        )}

        {currentUser && !showModeratorBoard && !showAdminBoard && (
          <li className="nav-item">
            <Link to="/user" className="nav-link">
              <i className="bi bi-person-fill"></i> Área de Usuario
            </Link>
          </li>
        )}
      </div>
      
      {currentUser ? (
        <div className="navbar-nav ms-auto">
          <li className="nav-item">
            <Link to="/profile" className="nav-link">
              <i className="bi bi-person-circle"></i> {currentUser.username}
            </Link>
          </li>
          <li className="nav-item">
            <a href="/login" className="nav-link" onClick={logOut}>
              <i className="bi bi-box-arrow-right"></i> Cerrar Sesión
            </a>
          </li>
        </div>
      ): (
        <div className="navbar-nav ms-auto">
          <li className="nav-item">
            <Link to="/login" className="nav-link">
              <i className="bi bi-box-arrow-in-right"></i> Iniciar Sesión
            </Link>
            
          </li>

          <li className="nav-item">
            <Link to="/register" className="nav-link">
              <i className="bi bi-person-plus"></i> Registrarse
            </Link>
          </li>
        </div>
      )}
    </nav>
    </>
  );
};

export default Navbar;
