// src/components/UserSessions.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const UserSessions = () => {
    const [gameMasterSessions, setGameMasterSessions] = useState([]);
    const [invitedSessions, setInvitedSessions] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSessions = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://127.0.0.1:8000/api/user-sessions', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setGameMasterSessions(response.data.game_master_sessions);
                setInvitedSessions(response.data.invited_sessions);
            } catch (error) {
                console.error('Failed to fetch sessions:', error);
                toast.error('Failed to fetch sessions.');
            }
        };

        fetchSessions();
    }, []);

    const handleNavigate = (session, isGameMaster) => {
        if (isGameMaster) {
            navigate(`/session/${session.token}`);
        } else {
            navigate(`/sessions/${session.token}/play`);
        }
    };

    return (
        <div className="user-sessions-container">
            <h2>My Sessions</h2>
            <h3>As Game Master</h3>
            <ul>
                {gameMasterSessions.map(session => (
                    <li key={session.token}>
                        <span>{session.title}</span>
                        <button onClick={() => handleNavigate(session, true)}>Manage</button>
                    </li>
                ))}
            </ul>
            <h3>As Invited Player</h3>
            <ul>
                {invitedSessions.map(session => (
                    <li key={session.token}>
                        <span>{session.title}</span>
                        <button onClick={() => handleNavigate(session, false)}>Play</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserSessions;
