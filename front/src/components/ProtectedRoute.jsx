import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "../api";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants";
import { useState, useEffect } from "react";


function ProtectedRoute({ children }) {
    const [isAuthorized, setIsAuthorized] = useState(null);

    // Try to autorize with Access token
    useEffect(() => {
        auth().catch(() => setIsAuthorized(false))
    }, [])

    const refreshToken = async () => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN);
        // Retrieve Access token with Refresh token
        try {
            const res = await api.post("/api/token/refresh/", {
                refresh: refreshToken,
            });
            if (res.status === 200) {
                localStorage.setItem(ACCESS_TOKEN, res.data.access) // write Access token to local storage
                setIsAuthorized(true)
            } else {
                setIsAuthorized(false)
            }
        } catch (error) {
            console.log(error);
            setIsAuthorized(false);
        }
    };

    const auth = async () => {
        const token = localStorage.getItem(ACCESS_TOKEN); // Retrieve access token from local storage
        if (!token) {
            setIsAuthorized(false);
            return;
        }
        const decoded = jwtDecode(token);
        const tokenExpiration = decoded.exp;
        const now = Date.now() / 1000; // convert to seconds

        // If token is expired, try to get new with Refresh token
        if (tokenExpiration < now) {
            await refreshToken();
        } else {
            setIsAuthorized(true); // If not expired, authorize
        }
    };

    if (isAuthorized === null) {
        return <div>Loading...</div>;
    }

    // If not authorized, redirect to login page
    return isAuthorized ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;