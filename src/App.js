// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FormsPage from './pages/FormsPage';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/DashBoard';
import RegisterPage from './pages/RegisterPage';
import SessionPage from './pages/SessionPage';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';
import JoinSessionPage from './pages/JoinSession';
import SessionDetails from './components/SessionDetails';
import SessionsList from './components/SessionsList';
import Profile from './components/Profile';
import EditProfile from './components/EditProfile';
import SessionManagementPage from './pages/SessionManagementPage';
import GameMasterPage from './pages/GameMasterPage';
import PlayerSessionPage from './pages/PlayerSessionPage';
// import PlayerDashboardPage from './pages/PlayerDashboardPage';

const App = () => {
    return (
        <Router>
            <div>
                <Navbar />
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/dashboard" element={
                        <PrivateRoute>
                            <Dashboard />
                        </PrivateRoute>
                    } />
                    <Route path="/session" element={<SessionManagementPage />} />
                    <Route path="/session/:sessionToken" element={<SessionPage />} />
                    <Route path="/" element={<FormsPage />} />
                    <Route path="/session-details/:sessionId" element={<SessionDetails />} />
                    <Route path="/join-session/:sessionToken" element={<JoinSessionPage />} />
                    <Route path="/sessions" element={<SessionsList />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/profile/edit" element={<EditProfile />} />
                    <Route path="/session/:sessionToken/play" element={<PlayerSessionPage />} />
                    <Route path="/game-master/:sessionToken" element={
                        <PrivateRoute>
                            <GameMasterPage />
                        </PrivateRoute>
                    } />
                    {/* <Route path="/player-dashboard/:sessionToken" element={
                        <PrivateRoute>
                            <PlayerDashboardPage />
                        </PrivateRoute>
                    } /> */}
                </Routes>
                <ToastContainer />
            </div>
        </Router>
    );
};

export default App;
