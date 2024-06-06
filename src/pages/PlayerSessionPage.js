// src/pages/PlayerSessionPage.js

import React, { useEffect, useState } from 'react';
import QuestList from '../components/QuestList';
import QuestForm from '../components/QuestForm';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const PlayerSessionPage = () => {
    const { sessionToken } = useParams();
    const [sessionDetails, setSessionDetails] = useState(null);
    const [currentUserId, setCurrentUserId] = useState(null);
    const [isGameMaster, setIsGameMaster] = useState(false);

    useEffect(() => {
        const fetchDetails = async () => {
            const token = localStorage.getItem('token');
            try {
                const userResponse = await axios.get('http://127.0.0.1:8000/api/user', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setCurrentUserId(userResponse.data.id);

                const sessionResponse = await axios.get(`http://127.0.0.1:8000/api/sessions/${sessionToken}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setSessionDetails(sessionResponse.data);
                setIsGameMaster(userResponse.data.id === sessionResponse.data.game_master_id);
            } catch (error) {
                console.error('Failed to fetch details:', error);
                toast.error('Failed to fetch details.');
            }
        };

        fetchDetails();
    }, [sessionToken]);

    return (
        <div>
            <h1>Player Session</h1>
            {sessionDetails && (
                <>
                    <QuestList sessionToken={sessionToken} />
                    {isGameMaster && <QuestForm sessionToken={sessionToken} />}
                </>
            )}
            {/* Add other player-specific components like PlayerCharacter, Shop, Wallet, etc. */}
        </div>
    );
};

export default PlayerSessionPage;
