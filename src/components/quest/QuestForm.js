// src/components/QuestForm.js

import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const QuestForm = ({ sessionToken }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        try {
            const response = await axios.post(`http://127.0.0.1:8000/api/session/${sessionToken}/quests`,
                { title, description },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            toast.success('Quest added successfully!');
            setTitle('');
            setDescription('');
        } catch (error) {
            console.error('Failed to add quest:', error);
            toast.error('Failed to add quest.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Title</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Description</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Add Quest</button>
        </form>
    );
};

export default QuestForm;
