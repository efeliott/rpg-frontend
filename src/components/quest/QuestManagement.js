// src/components/QuestManagement.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const QuestManagement = () => {
    const { sessionToken } = useParams();
    const [quests, setQuests] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        const fetchQuests = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`http://127.0.0.1:8000/api/sessions/${sessionToken}/quests`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setQuests(response.data);
            } catch (error) {
                console.error('Failed to fetch quests:', error);
                toast.error('Failed to fetch quests.');
            }
        };

        fetchQuests();
    }, [sessionToken]);

    const handleAddQuest = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`http://127.0.0.1:8000/api/sessions/${sessionToken}/quests`, {
                title,
                description
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            toast.success(response.data.message);
            setQuests([...quests, response.data.quest]);
            setTitle('');
            setDescription('');
        } catch (error) {
            console.error('Failed to add quest:', error);
            toast.error('Failed to add quest.');
        }
    };

    const handleRemoveQuest = async (questId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.delete(`http://127.0.0.1:8000/api/quests/${questId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            toast.success(response.data.message);
            setQuests(quests.filter(quest => quest.id !== questId));
        } catch (error) {
            console.error('Failed to remove quest:', error);
            toast.error('Failed to remove quest.');
        }
    };

    return (
        <div>
            <h2>Quest Management</h2>
            <input
                type="text"
                placeholder="Quest Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
                placeholder="Quest Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <button onClick={handleAddQuest}>Add Quest</button>
            <ul>
                {quests.map(quest => (
                    <li key={quest.id}>
                        <strong>{quest.title}</strong>: {quest.description}
                        <button onClick={() => handleRemoveQuest(quest.id)}>Remove</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default QuestManagement;
