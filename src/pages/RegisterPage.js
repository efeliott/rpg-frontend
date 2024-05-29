// src/pages/RegisterPage.js

import React, { useState } from 'react';
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
                <h2>Créer un compte</h2>
                <SignupForm />
                <p>
                    Vous avez déjà un compte ?{' '}
                    <a href="/login" onClick={toggleForm}>
                        Connectez-vous ici.
                    </a>
                </p>
            </div>
        </div>
    );
};

export default HomePage;
