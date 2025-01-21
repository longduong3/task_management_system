import axios from 'axios';

const session = JSON.parse(localStorage.getItem('session'));

const apiCall = axios.create({
    baseURL: 'http://localhost:3000/api/v1/',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session ? `${session.access_token}` : ''}`,
    },
});

export default apiCall;