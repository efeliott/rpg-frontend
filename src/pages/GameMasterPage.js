// src/pages/GameMasterPage.js

import React from 'react';
import GameMasterDashboard from '../components/GameMasterDashboard';
import '../style/GameMasterPage.css';

const GameMasterPage = () => {
    return (
        <div className="game-master-page">
            <GameMasterDashboard />
        </div>
    );
};

export default GameMasterPage;
