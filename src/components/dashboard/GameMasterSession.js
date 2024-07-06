// src/components/dashboard/GameMasterSessions.js

import React from 'react';

const GameMasterSessions = ({ sessions, onNavigate }) => {
  return (
    <div className="sessions-section">
      <h2>Game Master Sessions</h2>
      {sessions.length === 0 ? (
        <p>You are not a game master in any sessions.</p>
      ) : (
        <ul className="sessions-list">
          {sessions.map(session => (
            <li key={session.token} className="session-item">
              <span>{session.title}</span>
              <button onClick={() => onNavigate(session, true)}>Manage</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GameMasterSessions;
