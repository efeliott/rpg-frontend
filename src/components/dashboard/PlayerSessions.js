// src/components/dashboard/PlayerSessions.js

import React from 'react';

const PlayerSessions = ({ sessions, onNavigate }) => {
  return (
    <div className="sessions-section">
      <h2>Player Sessions</h2>
      {sessions.length === 0 ? (
        <p>You are not a player in any sessions.</p>
      ) : (
        <ul className="sessions-list">
          {sessions.map(session => (
            <li key={session.token} className="session-item">
              <span>{session.title}</span>
              <button onClick={() => onNavigate(session, false)}>Play</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PlayerSessions;
