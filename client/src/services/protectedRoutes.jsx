import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

function isTokenExpired(token) {
    try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000; // Now
        return decoded.exp < currentTime;
    } catch (error) {
        return true;
    }
}

function ProtectedRoute({ children }) {
    const session = JSON.parse(localStorage.getItem('session'));
    let token = session ? session.access_token : null;
    if (!token || isTokenExpired(token)) {
        // Clear session if it had expired
        localStorage.removeItem('session');
        return <Navigate to="/" />;
    }

    return children;
}

export default ProtectedRoute;