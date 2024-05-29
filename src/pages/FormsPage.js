// src/pages/HomePage.js

import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/RegisterForm';
import '../style/FormsPages.css';

const HomePage = () => {
    const [isLogin, setIsLogin] = useState(true);

    const toggleForm = () => {
        setIsLogin(!isLogin);
    };

    return (
        <div className="homepage-container">
            <div className="form-card">
                {isLogin ? (
                    <>
                        <h2>Authentifiez-vous</h2>
                        <LoginForm />
                        <p>
                            Vous n'avez pas de compte ?{' '}
                            <a href="/register" onClick={toggleForm}>
                                Créer un compte ici.
                            </a>
                        </p>
                    </>
                ) : (
                    <>
                        <h2>Créer un compte</h2>
                        <SignupForm />
                        <p>
                            Vous avez déjà un compte ?{' '}
                            <a href="/login" onClick={toggleForm}>
                                Connectez-vous ici.
                            </a>
                        </p>
                    </>
                )}
            </div>
        </div>
    );
};

export default HomePage;
