import React, { useState, useEffect } from 'react';
import UserService from '../../services/user.service';

const Home: React.FC = () => {
  const [content, setContent] = useState<string>('');

  useEffect(() => {
    UserService.getPublicContent()
      .then((response) => {
        setContent(response.data);
      })
      .catch((error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
        setContent(_content);
      });
  }, []);  return (
    <div>
      <div className="container">
        <header className="jumbotron">
          <h3>{content}</h3>
          <h1>Bienvenido a nuestra aplicación</h1>
          <p>
            Esta es la página principal accesible para todos los usuarios, tanto registrados como no registrados.
            Utiliza la barra de navegación para acceder a las diferentes secciones según tu rol.
          </p>
        </header>
      </div>
    </div>
  );
};

export default Home;
