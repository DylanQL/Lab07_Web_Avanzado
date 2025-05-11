import React, { useState, useEffect } from 'react';
import UserService from '../../services/user.service';

const BoardModerator: React.FC = () => {
  const [content, setContent] = useState<string>('');

  useEffect(() => {
    UserService.getModeratorBoard()
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
        <h1>Panel de Moderación</h1>
        <p>
          Esta página solo es accesible para usuarios con rol de moderador.
          Aquí se pueden gestionar el contenido y usuarios de la aplicación.
        </p>
      </header>
    </div>
  );
};

export default BoardModerator;
