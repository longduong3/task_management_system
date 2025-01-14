import axios from 'axios';

const apiCall = axios.create({
    baseURL: 'http://localhost:3000/api/v1/',
});

export default apiCall;