// src/components/GameMasterDashboard.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import QuestManagement from './QuestManagement';

const GameMasterDashboard = () => {
    const { sessionToken } = useParams();
    const [sessionDetails, setSessionDetails] = useState(null);

    useEffect(() => {
        const fetchSessionDetails = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`http://127.0.0.1:8000/api/sessions/${sessionToken}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setSessionDetails(response.data);
            } catch (error) {
                console.error('Failed to fetch session details:', error);
                toast.error('Failed to fetch session details.');
            }
        };

        fetchSessionDetails();
    }, [sessionToken]);

    if (!sessionDetails) return <div>Loading session details...</div>;

    return (
        <div className="game-master-dashboard">
            <h1>Game Master Dashboard</h1>
            <h2>Session: {sessionDetails.title}</h2>
            <p>Description: {sessionDetails.description}</p>
            <QuestManagement />
            {/* Add other management components like PlayerManagement, ShopManagement, etc. */}
        </div>
    );
};

export default GameMasterDashboard;
