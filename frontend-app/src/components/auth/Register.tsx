import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import AuthService from '../../services/auth.service';

const Register: React.FC = () => {
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState('');

  const initialValues = {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  const validationSchema = Yup.object().shape({    username: Yup.string()
      .test(
        'len',
        'El usuario debe tener entre 3 y 20 caracteres.',
        (val): boolean => Boolean(val && val.length >= 3 && val.length <= 20)
      )
      .required('Este campo es obligatorio!'),
    email: Yup.string()
      .email('Este no es un email válido.')
      .required('Este campo es obligatorio!'),    password: Yup.string()
      .test(
        'len',
        'La contraseña debe tener entre 6 y 40 caracteres.',
        (val): boolean => Boolean(val && val.length >= 6 && val.length <= 40)
      )
      .required('Este campo es obligatorio!'),    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), undefined], 'Las contraseñas no coinciden')
      .required('Confirmar contraseña es obligatorio')
  });

  const handleRegister = (formValue: { username: string; email: string; password: string }) => {
    const { username, email, password } = formValue;

    setMessage('');
    setSuccessful(false);

    AuthService.register({
      username,
      email,
      password,
    })
      .then((response) => {
        setMessage(response.data.message);
        setSuccessful(true);
      })
      .catch((error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setMessage(resMessage);
        setSuccessful(false);
      });
  };

  return (
    <div className="col-md-12">
      <div className="card card-container">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleRegister}
        >
          <Form>
            {!successful && (
              <div>
                <div className="form-group">
                  <label htmlFor="username">Usuario</label>
                  <Field name="username" type="text" className="form-control" />
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <Field name="email" type="email" className="form-control" />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Contraseña</label>
                  <Field name="password" type="password" className="form-control" />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirmar Contraseña</label>
                  <Field name="confirmPassword" type="password" className="form-control" />
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>

                <div className="form-group">
                  <button type="submit" className="btn btn-primary btn-block">Registrarse</button>
                </div>
              </div>
            )}

            {message && (
              <div className="form-group">
                <div
                  className={
                    successful ? "alert alert-success" : "alert alert-danger"
                  }
                  role="alert"
                >
                  {message}
                </div>
              </div>
            )}
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Register;
