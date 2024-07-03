// src/components/RegisterForm.js

import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ThreeDots } from 'react-loader-spinner';

const RegisterForm = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/register', {
                username,
                email,
                password,
                password_confirmation: passwordConfirmation,
            });

            setIsLoading(false);

            if (response.data && response.data.token) {
                toast.success('Registration successful! Please login.');
                console.log('Registration successful, token:', response.data.token);
                setUsername('');
                setEmail('');
                setPassword('');
                setPasswordConfirmation('');
            } else {
                toast.error('Registration failed. Please try again.');
            }
        } catch (error) {
            setIsLoading(false);
            toast.error('Registration failed. Please check your inputs.');
            console.error('Registration error:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <input
                type="password"
                placeholder="Confirm Password"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
            />
            <button type="submit" disabled={isLoading}>
                {isLoading ? <ThreeDots color="#fff" height={10} width={30} /> : 'Register'}
            </button>
        </form>
    );
};

export default RegisterForm;