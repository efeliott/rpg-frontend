// src/components/Navbar.js

import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../style/Navbar.css';
import axios from 'axios';

const Navbar = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        if (localStorage.getItem('token')) {
            axios.get('/api/profile', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then(response => {
                setUsername(response.data.username);
            })
            .catch(error => {
                console.error('Error fetching user profile:', error);
            });
        }
    }, []);

    const handleLogout = () => {
        // Suppression du token d'authentification
        localStorage.removeItem('token');

        // Redirige l'utilisateur vers la page de connexion
        navigate('/login');
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const closeDropdown = () => {
        setIsDropdownOpen(false);
    };

    const isAuthenticated = !!localStorage.getItem('token');

    return (
        <nav className="navbar">
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                {isAuthenticated ? (
                    <>
                        <li>
                            <Link to="/dashboard">Dashboard</Link>
                        </li>
                        <li>
                            <Link to="/session">Session</Link>
                        </li>
                    </>
                ) : null}
                <li 
                    className="user-menu" 
                    ref={dropdownRef}
                    onMouseEnter={toggleDropdown}
                    onMouseLeave={closeDropdown}
                >
                    <button className="dropdown-toggle">
                        {"Mon compte"} &#9662;
                    </button>
                    {isDropdownOpen && (
                        <div className="dropdown-menu">
                            {isAuthenticated ? (
                                <>
                                    <Link to="/profile" className="dropdown-item" onClick={closeDropdown}>Profile</Link>
                                    <button onClick={handleLogout} className="dropdown-item">Logout</button>
                                </>
                            ) : (
                                <>
                                    <Link to="/login" className="dropdown-item" onClick={closeDropdown}>Login</Link>
                                    <Link to="/register" className="dropdown-item" onClick={closeDropdown}>Register</Link>
                                </>
                            )}
                        </div>
                    )}
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
