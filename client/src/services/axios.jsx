import axios from 'axios';

const token = localStorage.getItem('token');
const apiCall = axios.create({
    baseURL: 'http://localhost:3000/api/v1/',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': token,
    },
});

export default apiCall;