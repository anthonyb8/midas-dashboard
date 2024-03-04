// src/hooks/useDashboard.js
import { useState, useContext, useEffect } from 'react';
import { BacktestContext } from '../../../contexts/DataContext'; 
import log from 'loglevel';
import { getBacktestById } from '../../../services/apiClient';

/**
 * Custom hook for managing the dashboard state, including loading backtests,
 * handling current backtest selection, and interacting with the BacktestContext.
 * 
 * @returns {Object} The state and functions needed for dashboard operation.
 */
export const useDashboard = () => {
    const [loading, setLoading] = useState(false);
    const {
        getBacktest,
        removeBacktest,
        backtestsCache,
        currentBacktestId,
        setCurrentBacktest
    } = useContext(BacktestContext);

    useEffect(() => {
        const loadBacktestData = async () => {
            if (currentBacktestId && !backtestsCache[currentBacktestId]) {
                log.debug(`Loading backtest data for ID: ${currentBacktestId}`);
                setLoading(true);
                try {
                    await getBacktest(currentBacktestId);
                    log.info(`Backtest data loaded for ID: ${currentBacktestId}`);
                } catch (error) {
                    log.error(`Failed to load backtest data for ID: ${currentBacktestId}:`, error);
                }
                setLoading(false);
            }
        };
        loadBacktestData();
    }, [currentBacktestId, backtestsCache]);

    /**
     * Handles click events on backtest tabs, setting the current backtest ID.
     * 
     * @param {string} id - The ID of the backtest to set as current.
     */
    const handleTabClick = (id) => {
        log.debug(`Setting current backtest ID to: ${id}`);
        setCurrentBacktest(id);
    };

    return {
        loading,
        backtestsCache,
        currentBacktestId,
        handleTabClick,
        removeBacktest
    };
};
