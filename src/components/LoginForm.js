// src/components/LoginForm.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ThreeDots } from 'react-loader-spinner';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            console.log('Token found in localStorage:', token);
            navigate('/dashboard');
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/login', {
                email,
                password,
            });

            setIsLoading(false);

            if (response.data && response.data.access_token) {
                localStorage.setItem('token', response.data.access_token);
                toast.success('Login successful!');
                console.log('Login successful, token:', response.data.access_token);

                const joinSessionToken = localStorage.getItem('join_session_token');
                console.log('join_session_token in localStorage:', joinSessionToken);

                if (joinSessionToken) {
                    localStorage.removeItem('join_session_token'); // Remove the token to prevent re-execution
                    navigate(`/join-session/${joinSessionToken}`);
                } else {
                    navigate('/dashboard');
                }
            } else {
                toast.error('Incorrect login or password.');
            }
        } catch (error) {
            setIsLoading(false);
            toast.error('Login failed. Please check your credentials.');
            console.error('Login error:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
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
            <button type="submit" disabled={isLoading}>
                {isLoading ? <ThreeDots color="#fff" height={10} width={30} /> : 'Login'}
            </button>
        </form>
    );
};

export default LoginForm;
