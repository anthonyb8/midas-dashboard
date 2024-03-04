import React, { createContext, useState, useEffect } from 'react';
import * as api_client from "../services/apiClient";
import log from "loglevel";


/**
 * Context for managing authentication state across the application.
 * Provides functionality to log in, log out, and check authentication status.
 */
export const AuthContext = createContext();


/**
 * Provides authentication-related state and functions to its children.
 * 
 * @param {Object} props - Props object
 * @param {React.ReactNode} props.children - Child components of AuthProvider
 */
export function AuthProvider ({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [authToken, setAuthToken] = useState(null);

    /**
     * Attempts to authenticate a user with a username and password.
     * 
     * @param {string} username - Username of the user
     * @param {string} password - Password of the user
     * @param {Function} navigate - Navigation function to redirect on successful login
     */
    const login = async (username, password, navigate) => {
        try {
            const token = await api_client.login(username, password);
            if (token) {
                setIsAuthenticated(true);
                setAuthToken(token);
                sessionStorage.setItem('token', token); // Save token to sessionStorage
                log.info(`Login successful for user: ${username}`);
                navigate('/filter');
            }
        } catch (error) {
            log.error("Login error", error);
        }
    };

    /**
     * Logs out the current user and clears the authentication state.
     * 
     * @param {Function} navigate - Navigation function to redirect on logout
     */
    const logout = (navigate) => {
        api_client.logout()
        setIsAuthenticated(false);
        setAuthToken(null);
        log.info("User logged out successfully.");
        navigate(''); // Redirect to home page or login page after logout
    };

    // Check token on initial load to restore session if token exists
    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
            setAuthToken(token);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, authToken, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};



