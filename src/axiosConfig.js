// src/axiosConfig.js

import axios from 'axios';

// Configurer Axios pour inclure les cookies
axios.defaults.withCredentials = true;

// Intercepteur pour ajouter le token CSRF à chaque requête
axios.interceptors.request.use(
    config => {
        const token = document.querySelector('meta[name="csrf-token"]');
        if (token) {
            config.headers['X-CSRF-TOKEN'] = token.getAttribute('content');
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export default axios;
