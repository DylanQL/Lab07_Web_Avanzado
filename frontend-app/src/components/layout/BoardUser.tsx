import React, { useState, useEffect } from 'react';
import UserService from '../../services/user.service';

const BoardUser: React.FC = () => {
  const [content, setContent] = useState<string>('');

  useEffect(() => {
    UserService.getUserBoard()
      .then((response) => {
        setContent(response.data);
      })
      .catch((error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setContent(_content);
      });
  }, []);

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>{content}</h3>
        <h1>Área de Usuario</h1>
        <p>
          Esta página solo es accesible para usuarios autenticados.
          Aquí puedes ver y gestionar tu contenido personal.
        </p>
      </header>
    </div>
  );
};

export default BoardUser;
