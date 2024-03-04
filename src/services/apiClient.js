import React from "react";
import axios from 'axios';
import log from "loglevel";

// API Client
// ----------

/**
 * Axios API instance configured with base URL and default headers.
 */
const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
      "Content-type": "application/json",
    }
  });

/**
 * Attempts to log in a user with provided credentials.
 * 
 * @param {string} username - The username of the user.
 * @param {string} password - The password of the user.
 * @returns {Promise<string>} The authentication token on successful login.
 * @throws {Error} When login fails due to network issues or invalid credentials.
 */
export async function login (username, password) {
    log.debug(`Attempting to log in user: ${username}`);
    try {
        const response = await api.post('/api/login/', { username, password });
        const { token } = response.data;
        if (token) {
          sessionStorage.setItem('token', token); // Save token to sessionStorage
          log.info(`User ${username} logged in successfully.`);
          return token; // Return token for further processing if needed
        }
      } catch (error) {
        log.error("Login error", error);
        // Optionally, handle or throw the error for the caller to handle
        throw error;
      }
};

/**
 * Logs out the current user by removing the authentication token from sessionStorage.
 */
export function logout () {
    log.debug("Logging out user.");
    sessionStorage.removeItem('token'); // Remove token from sessionStorage
    log.info("User logged out successfully.");
};

/**
 * Fetches backtest data for a given backtest ID.
 * 
 * @param {string} backtest_id - The ID of the backtest to fetch.
 * @returns {Promise<Object>} A promise that resolves with the backtest data if successful.
 * @throws {Error} Throws an error if the fetch fails.
 */
export async function getBacktestById (backtest_id) {
    log.debug(`Fetching backtest data for ID: ${backtest_id}`);
    const authToken = sessionStorage.getItem('token');
    try {
        const response = await api.get(`/api/backtest/${backtest_id}/`, {
            headers: { 'Authorization': `Token ${authToken}` }
        });
        console.log(response)
        if (response.status === 200) {
            log.info(`Backtest data for ID: ${backtest_id} fetched successfully.`);
            return response.data;
        } else {
            log.warn(`Error fetching backtest for ID: ${backtest_id}`, response.statusText);
        }
    } catch (error) {
        log.error(`Error fetching backtest for ID: ${backtest_id}`, error);
        throw error;
    }
};

/**
 * Fetches a list of backtests.
 * 
 * @returns {Promise<Array>} A promise that resolves with an array of backtest summaries if successful.
 * @throws {Error} Throws an error if the fetch fails.
 */
export async function getBacktestList (backtest_id) {
    log.debug("Fetching backtest list.");
    const authToken = sessionStorage.getItem('token');
    try {
        const response = await api.get('/api/backtest/',{
        headers: { 'Authorization': `Token ${authToken}` }
        }); 
        console.log("response", response)
        if (response.status === 200) {
            log.info("Backtest list fetched successfully.");
            return response.data;
        } else {
            log.warn("Error fetching backtest list", response.statusText);
        } 
    } catch (error) {
        log.error("Error fetching backtest list", error);
        throw error;
    }
};




