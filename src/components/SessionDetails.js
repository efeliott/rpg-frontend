// src/components/SessionDetails.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const SessionDetails = () => {
    const { sessionToken } = useParams();
    const [session, setSession] = useState(null);

    useEffect(() => {
        const fetchSession = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`http://127.0.0.1:8000/api/sessions/${sessionToken}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setSession(response.data);
            } catch (error) {
                console.error('Failed to fetch session details:', error);
            }
        };

        fetchSession();
    }, [sessionToken]);

    if (!session) return <div>Loading session details...</div>;

    return (
        <div>
            <h3>Session: {session.title}</h3>
            <p>Description: {session.description}</p>
            <div>
                <h4>Users:</h4>
                <ul>
                    {session.users.map(user => (
                        <li key={user.id}>{user.email}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default SessionDetails;
