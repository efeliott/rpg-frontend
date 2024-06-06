// src/components/QuestList.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const QuestList = () => {
    const { sessionToken } = useParams();
    const [quests, setQuests] = useState([]);

    useEffect(() => {
        const fetchQuests = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`http://127.0.0.1:8000/api/session/${sessionToken}/quests`, {
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

    return (
        <div>
            <h2>Quests</h2>
            <ul>
                {quests.map(quest => (
                    <li key={quest.id}>
                        <strong>{quest.title}</strong>: {quest.description}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default QuestList;
