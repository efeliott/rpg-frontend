// src/components/EditProfile.js

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const EditProfile = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/profile', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(response => {
            setEmail(response.data.email);
            setUsername(response.data.username);
        })
        .catch(error => {
            setError(error.message);
        });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put('http://127.0.0.1:8000/api/profile', {
            email, password, username
        }, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(response => {
            if (response.data.message === 'Profile updated successfully.') {
                toast.success('Profile updated successfully.');
                navigate('/profile');
            }
        })
        .catch(error => {
            toast.error('Error updating profile: ' + error.message);
            setError(error.message);
        });
    };

    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h1>Edit Profile</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">Update Profile</button>
            </form>
        </div>
    );
};

export default EditProfile;
