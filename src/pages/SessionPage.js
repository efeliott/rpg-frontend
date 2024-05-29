// src/pages/SessionPage.js

import React from 'react';
import { useParams } from 'react-router-dom';
import SessionDetails from '../components/SessionDetails';
import InvitePlayers from '../components/InvitePlayers';
import CreatePlayer from '../components/CreatePlayer';
import ManagePlayers from '../components/ManagePlayers';
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
