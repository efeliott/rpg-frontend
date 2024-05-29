// src/pages/JoinSession.js

import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const JoinSessionPage = () => {
    const { sessionToken } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const joinSession = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                console.log('No token found, storing join_session_token and redirecting to login');
                localStorage.setItem('join_session_token', sessionToken);
                navigate('/login');
                return;
            }

            try {
                console.log('Sending join session request with token:', sessionToken);
                const response = await axios.post('http://127.0.0.1:8000/api/sessions/join', { session_token: sessionToken }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (response.data.message === 'You have joined the session!') {
                    toast.success('Successfully joined the session!');
                    console.log('Successfully joined the session:', response.data);
                    navigate('/dashboard');
                } else {
                    toast.error('Failed to join the session.');
                    console.log('Failed to join the session:', response.data);
                    navigate('/dashboard');
                }
            } catch (error) {
                toast.error('Failed to join the session.');
                console.error('Error joining session:', error);
                navigate('/dashboard');
            }
        };

        joinSession();
    }, [sessionToken, navigate]);

    return <div>Joining session...</div>;
};

export default JoinSessionPage;
