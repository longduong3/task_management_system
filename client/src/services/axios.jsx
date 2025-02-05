import axios from 'axios';

const session = JSON.parse(localStorage.getItem('session'));
const apiCall = axios.create({
    baseURL: 'http://localhost:3000/api/v1/',
    headers: {
        'Content-Type': 'application/json',
    },
});

apiCall.interceptors.request.use(
    (config) => {
        const session = JSON.parse(localStorage.getItem('session'));
        if (session && session.access_token) {
            config.headers['Authorization'] = `Bearer ${session.access_token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


export default apiCall;