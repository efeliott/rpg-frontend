// src/pages/SessionPage.js

import React from 'react';
import { useParams } from 'react-router-dom';
import SessionDetails from '../components/session/SessionDetails';
import InvitePlayers from '../components/player/InvitePlayers';
import CreatePlayer from '../components/player/CreatePlayer';
import ManagePlayers from '../components/player/ManagePlayers';
import '../style/SessionPage.css';

const SessionPage = () => {
    const { sessionToken } = useParams();

    return (
        <div className="session-page">
            <h1>Session Management</h1>
            <SessionDetails sessionToken={sessionToken} />
            <InvitePlayers sessionToken={sessionToken} />
            <CreatePlayer />
            <ManagePlayers />
        </div>
    );
};

export default SessionPage;
