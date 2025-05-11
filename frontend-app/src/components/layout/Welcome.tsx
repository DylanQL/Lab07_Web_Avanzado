import React, { useEffect, useState } from 'react';
import AuthService from '../../services/auth.service';
import { useNavigate } from 'react-router-dom';

const Welcome: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className="container">
      <header className="jumbotron">
        <h1>¡Bienvenido, {currentUser?.username}!</h1>
        <p>
          Has iniciado sesión correctamente en nuestra aplicación.
        </p>
        <div className="welcome-options">
          <h3>¿Qué deseas hacer ahora?</h3>
          <div className="row mt-4">
            {currentUser?.roles?.includes('ROLE_USER') && (
              <div className="col-md-4 mb-3">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Panel de Usuario</h5>
                    <p className="card-text">Accede a tu panel de usuario para gestionar tus datos.</p>
                    <button 
                      className="btn btn-primary" 
                      onClick={() => navigate('/user')}
                    >
                      Ir al Panel
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {currentUser?.roles?.includes('ROLE_MODERATOR') && (
              <div className="col-md-4 mb-3">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Panel de Moderador</h5>
                    <p className="card-text">Accede a tu panel de moderación.</p>
                    <button 
                      className="btn btn-info" 
                      onClick={() => navigate('/mod')}
                    >
                      Ir a Moderación
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {currentUser?.roles?.includes('ROLE_ADMIN') && (
              <div className="col-md-4 mb-3">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Panel de Administración</h5>
                    <p className="card-text">Accede a tu panel de administración.</p>
                    <button 
                      className="btn btn-danger" 
                      onClick={() => navigate('/admin')}
                    >
                      Ir a Administración
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            <div className="col-md-4 mb-3">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Perfil</h5>
                  <p className="card-text">Ver y editar tu perfil de usuario.</p>
                  <button 
                    className="btn btn-success" 
                    onClick={() => navigate('/profile')}
                  >
                    Ver Perfil
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Welcome;
