// src/components/CreateSessionForm.js

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const CreateSessionForm = ({ setCurrentSessionId }) => {
    const [title, setSessionTitle] = useState('');
    const [description, setSessionDescription] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Ajout de l'adresse de l'API pour la création de session
            const token = localStorage.getItem('token');
            const response = await axios.post('http://127.0.0.1:8000/api/session', {
                title: title,
                description: description,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.data) {
                toast.success('Session created successfully!');
                setCurrentSessionId(response.data.session.session_id);
                navigate(`/session/${response.data.session.token}`);
            }
        } catch (error) {
            toast.error('Failed to create session.');
            console.error('Session creation error:', error.response.data);
        }
    };

    return (
        <div className="form-card">
            <h2>Create Game Session</h2>
            <form onSubmit={handleSubmit}>
                <label>Session Name:</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setSessionTitle(e.target.value)}
                    required
                />

                <label>Description (facultatif):</label>
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setSessionDescription(e.target.value)}
                    required
                />
                <button type="submit">Create Session</button>
            </form>
        </div>
    );
};

export default CreateSessionForm;
