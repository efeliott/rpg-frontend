// src/components/InvitePlayers.js

import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const InvitePlayers = ({ sessionToken }) => {
    const [email, setEmail] = useState('');

    const handleInvite = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(
                `http://127.0.0.1:8000/api/sessions/${sessionToken}/invite`,
                { email },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            if (response.data.message === 'Invitation sent successfully.') {
                toast.success('Invitation sent!');
                setEmail('');
            } else {
                toast.error('Failed to send invitation.');
                console.error('Invitation error:', response.data);
            }
        } catch (error) {
            toast.error('Failed to send invitation.');
            console.error('Invitation error:', error.response?.data);
        }
    };

    return (
        <form onSubmit={handleInvite}>
            <label htmlFor="email">Enter player's email:</label>
            <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <button type="submit">Send Invitation</button>
        </form>
    );
};

export default InvitePlayers;