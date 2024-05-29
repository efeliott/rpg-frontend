// src/pages/LoginPage.js

import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import '../style/FormsPages.css';

const LoginPage = () => {
    const [isLogin, setIsLogin] = useState(true);

    const toggleForm = () => {
        setIsLogin(!isLogin);
    };

    return (
        <div className="homepage-container">
            <div className="form-card">
              <h2>Authentifiez-vous</h2>
              <LoginForm />
              <p>
                  Vous n'avez pas de compte ?{' '}
                  <a href="/register" onClick={toggleForm}>
                      Créer un compte ici.
                  </a>
              </p>
            </div>
        </div>
    );
};

export default LoginPage;