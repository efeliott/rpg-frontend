// src/components/GameMasterDashboard.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

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
            <div>
                <h3>Players</h3>
                <ul>
                    {sessionDetails.players.map(player => (
                        <li key={player.id}>
                            {player.name} ({player.class}) - {player.email}
                            {/* Add functionality for managing players here */}
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <h3>Quests</h3>
                <ul>
                    {sessionDetails.quests.map(quest => (
                        <li key={quest.id}>
                            {quest.title} - {quest.description}
                            {/* Add functionality for managing quests here */}
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <h3>Shop</h3>
                <ul>
                    {sessionDetails.shopItems.map(item => (
                        <li key={item.id}>
                            {item.name} - {item.description}
                            {/* Add functionality for managing shop items here */}
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <h3>Wallets</h3>
                <ul>
                    {sessionDetails.wallets.map(wallet => (
                        <li key={wallet.id}>
                            Player ID: {wallet.player_id} - Balance: {wallet.balance}
                            {/* Add functionality for managing wallets here */}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default GameMasterDashboard;
