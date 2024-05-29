import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ManagePlayers = () => {
    const { sessionToken } = useParams();
    const [players, setPlayers] = useState([]);
    const [editingPlayer, setEditingPlayer] = useState(null);
    const [name, setName] = useState('');
    const [playerClass, setPlayerClass] = useState('');

    useEffect(() => {
        fetchPlayers();
    }, [sessionToken]);

    const fetchPlayers = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`http://127.0.0.1:8000/api/sessions/${sessionToken}/players`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setPlayers(response.data);
        } catch (error) {
            console.error('Error fetching players:', error);
            toast.error('Error fetching players');
        }
    };

    const handleEdit = (player) => {
        setEditingPlayer(player.id);
        setName(player.name);
        setPlayerClass(player.class);
    };

    const handleUpdate = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.put(`http://127.0.0.1:8000/api/players/${editingPlayer}`, {
                name: name,
                class: playerClass
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            toast.success(response.data.message);
            setEditingPlayer(null);
            fetchPlayers();
        } catch (error) {
            console.error('Error updating player:', error);
            toast.error('Error updating player');
        }
    };

    const handleDelete = async (playerId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.delete(`http://127.0.0.1:8000/api/players/${playerId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            toast.success(response.data.message);
            fetchPlayers();
        } catch (error) {
            console.error('Error deleting player:', error);
            toast.error('Error deleting player');
        }
    };

    return (
        <div>
            <h2>Manage Character</h2>
            <ul>
                {players.map(player => (
                    <li key={player.id}>
                        {player.name} ({player.class})
                        <button onClick={() => handleEdit(player)}>Edit</button>
                        <button onClick={() => handleDelete(player.id)}>Delete</button>
                    </li>
                ))}
            </ul>
            {editingPlayer && (
                <div>
                    <h3>Edit Character</h3>
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
                    <button onClick={handleUpdate}>Update Player</button>
                </div>
            )}
        </div>
    );
};

export default ManagePlayers;
