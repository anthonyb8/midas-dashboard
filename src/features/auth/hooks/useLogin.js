import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import log from 'loglevel'; 


/**
 * Custom hook for handling user login.
 * 
 * Manages username and password inputs, submits login credentials,
 * and navigates to a specified route upon successful authentication.
 * 
 * @returns {Object} The state values and functions for managing login.
 */
export const useLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login, isAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            log.info('Authentication successful, navigating to /filter');
            navigate('/filter');
        }
    }, [isAuthenticated, navigate]);

    /**
     * Handles the form submission for logging in.
     * 
     * @param {Event} e - The form submit event.
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        log.debug('Attempting to log in with username:', username);
        try {
            await login(username, password);
            log.info('Login successful');
        } catch (error) {
            console.error('Login failed:', error);
            log.error('Login failed:', error);
        }
    };

    return {
        username,
        setUsername,
        password,
        setPassword,
        handleSubmit
    };
};
