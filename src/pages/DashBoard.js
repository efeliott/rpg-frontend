import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import GameMasterSessions from '../components/dashboard/GameMasterSession';
import PlayerSessions from '../components/dashboard/PlayerSessions';
import '../style/Dashboard.css';

const Dashboard = () => {
  const [gameMasterSessions, setGameMasterSessions] = useState([]);
  const [invitedSessions, setInvitedSessions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://127.0.0.1:8000/api/user-sessions', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setGameMasterSessions(response.data.game_master_sessions);
        setInvitedSessions(response.data.invited_sessions);
      } catch (error) {
        console.error('Failed to fetch sessions:', error);
        toast.error('Failed to fetch sessions.');
      }
    };

    fetchSessions();
  }, []);

  const handleNavigate = (session, isGameMaster) => {
    if (isGameMaster) {
      navigate(`/session/${session.token}`);
    } else {
      navigate(`/session/${session.token}/play`);
    }
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Dashboard</h1>
      <div className="dashboard-sections">
        <div className="dashboard-section">
          <GameMasterSessions sessions={gameMasterSessions} onNavigate={handleNavigate} />
        </div>
        <div className="dashboard-section">
          <PlayerSessions sessions={invitedSessions} onNavigate={handleNavigate} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
