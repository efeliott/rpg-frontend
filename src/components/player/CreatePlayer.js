// src/components/CreatePlayer.js

import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreatePlayer = () => {
    const { sessionToken } = useParams();
    const [userId, setUserId] = useState('');
    const [name, setName] = useState('');
    const [playerClass, setPlayerClass] = useState('');

    const handleCreatePlayer = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`http://127.0.0.1:8000/api/sessions/${sessionToken}/players`, {
                user_id: userId,
                name: name,
                class: playerClass
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            toast.success(response.data.message);

            // Réinitialiser les champs après succès
            setUserId('');
            setName('');
            setPlayerClass('');
        } catch (error) {
            console.error('Error creating player:', error);
            toast.error('Error creating player');
        }
    };

    return (
        <div>
            <h2>Create Player</h2>
            <input
                type="text"
                placeholder="User ID"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
            />
            <input
                type="text"
                placeholder="Character Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="text"
                placeholder="Character Class"
                value={playerClass}
                onChange={(e) => setPlayerClass(e.target.value)}
            />
            <button onClick={handleCreatePlayer}>Create Character</button>
        </div>
    );
};

export default CreatePlayer;