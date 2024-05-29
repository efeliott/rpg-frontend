// src/components/JoinSession.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const JoinSession = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const joinSession = async () => {
            const authToken = localStorage.getItem('token');
            if (!authToken) {
                console.log('User not authenticated. Redirecting to login...');
                localStorage.setItem('join_session_token', token);
                navigate('/login');
                return;
            }

            if (loading) return; // Prevent multiple calls
            setLoading(true);
            console.log('Attempting to join session with token:', token);

            try {
                const response = await axios.post(
                    'http://127.0.0.1:8000/api/join-session',
                    { session_token: token }, // Ensure the correct payload
                    {
                        headers: {
                            Authorization: `Bearer ${authToken}`,
                            'Content-Type': 'application/json'
                        }
                    }
                );

                setMessage('You have successfully joined the session!');
                toast.success('You have successfully joined the session!');
                console.log('Session joined successfully:', response.data);
                navigate(`/sessions/${response.data.session_id}`);
            } catch (error) {
                console.error('Error joining session:', error);
                if (error.response && error.response.status === 401) {
                    console.log('Unauthorized. Redirecting to login...');
                    localStorage.setItem('join_session_token', token);
                    navigate('/login');
                } else {
                    setMessage('Failed to join the session.');
                    toast.error('Failed to join the session.');
                }
            } finally {
                setLoading(false);
            }
        };

        joinSession();
    }, [token, navigate, loading]);

    return (
        <div>
            <p>{message}</p>
        </div>
    );
};

export default JoinSession;
