// src/components/SessionsList.js

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const SessionsList = () => {
    const [sessions, setSessions] = useState([]);

    useEffect(() => {
        // Fetch sessions from the API
        fetch('/api/sessions')
            .then(response => response.json())
            .then(data => setSessions(data));
    }, []);

    return (
        <div>
            <h1>Sessions</h1>
            <ul>
                {sessions.map(session => (
                    <li key={session.id}>
                        <Link to={`/sessions/${session.id}`}>{session.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default SessionsList;
