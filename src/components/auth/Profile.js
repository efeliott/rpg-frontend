// src/components/Profile.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/profile', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(response => {
            setUser(response.data);
        })
        .catch(error => {
            setError(error.message);
        });
    }, []);

    if (error) return React.createElement('div', null, `Error: ${error}`);
    if (!user) return React.createElement('div', null, 'Loading...');

    return React.createElement(
        'div',
        null,
        React.createElement('h1', null, 'Profile'),
        React.createElement('p', null, React.createElement('strong', null, 'Username: '), user.username),
        React.createElement('p', null, React.createElement('strong', null, 'Email: '), user.email),
        React.createElement('a', { href: '/profile/edit' }, 'Edit Profile')
    );
};

export default Profile;
