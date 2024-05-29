// src/components/PrivateRoute.js

import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  // Vérifier si le token est présent
  const authToken = localStorage.getItem('token');
  return authToken ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
