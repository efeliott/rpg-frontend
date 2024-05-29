// src/pages/SessionManagementPage.js

import React from 'react';
import CreateSessionForm from '../components/CreateSessionForm';
import InvitePlayers from '../components/InvitePlayers';
import UserSessions from '../components/UserSessions';
import '../style/SessionManagementPage.css';

const SessionManagementPage = () => {
    const [currentSessionId, setCurrentSessionId] = React.useState(null);

    return (
        <div className="session-management-container">
            <h1>Game Sessions</h1>
            <div className="form-card">
                <CreateSessionForm setCurrentSessionId={setCurrentSessionId} />
                {currentSessionId && <InvitePlayers sessionId={currentSessionId} />}
            </div>
            <UserSessions />
        </div>
    );
};

export default SessionManagementPage;
