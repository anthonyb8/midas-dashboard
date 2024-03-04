import React, { createContext, useState, useEffect } from 'react';
import * as client from "../services/apiClient";
import log from 'loglevel';

export const BacktestContext = createContext();

/**
 * Provides a context for managing and caching backtest data.
 * 
 * @param {Object} props - Component props containing children elements.
 */
export function BacktestProvider ({ children }) {
  const [backtestsCache, setBacktestsCache] = useState({});
  const [groupedSummaries, setGroupedSummaries] = useState({});
  const [currentBacktestId, setCurrentBacktestId] = useState(null);

  // const authToken = sessionStorage.getItem('token');

  // This is mainly for debugging, consider removing in production
  useEffect(() => {
    log.debug('Backtests Cache Updated:', backtestsCache);
  }, [backtestsCache]);

  /**
   * Sets the current backtest ID and updates session storage.
   * 
   * @param {string} id - The ID of the backtest to set as current.
   */
  const setCurrentBacktest = (id) => {
    setCurrentBacktestId(id);
    log.info(`Current backtest ID set to ${id}`);
    // sessionStorage.setItem('currentBacktestId', id);
  };

  /**
   * Fetches backtest summaries from the server and groups them by strategy.
   * If the summaries have already been fetched and are stored in the state,
   * it returns the cached summaries instead of re-fetching them.
   *
   * @returns {Promise<Object>} A promise that resolves to an object where keys are strategy names
   * and values are arrays of summary objects related to each strategy.
   */
  const fetchSummaries = async () => {
    log.debug('Fetching backtest summaries.');
    if (Object.keys(groupedSummaries).length === 0){
      try {
        const data = await client.getBacktestList();
        const grouped = groupSummariesByStrategy(data);
        log.info('Summaries fetched and grouped successfully.');
        setGroupedSummaries(grouped);
        return grouped;
      } catch (error) {
        log.error('Error fetching backtest summaries:', error);
        throw error; 
      }
    } else {
        log.debug('Returning cached grouped summaries.');
        return groupedSummaries;
    };
  };

  /**
   * Groups an array of summary objects by their strategy name.
   *
   * @param {Array} summaries - The array of summary objects to group. Each summary object must
   * include a 'strategy_name' property and optionally a 'parameters' property as a JSON string.
   * @returns {Object} An object where each key is a strategy name and each value is an array of
   * summaries associated with that strategy. The 'parameters' property of each summary, if present,
   * is parsed from JSON into an object.
   */
  const groupSummariesByStrategy = (summaries) => {
    return summaries.reduce((acc, summary) => {
      if (summary.strategy_name && summary.strategy_name.trim() !== "") {
        if (!acc[summary.strategy_name]) {
          acc[summary.strategy_name] = [];
        }
        const parsedParameters = summary.parameters ? JSON.parse(summary.parameters) : null;
        acc[summary.strategy_name].push({ ...summary, parameters: parsedParameters });
      }
      return acc;
    }, {});
  };

  /**
   * Fetches backtest data by ID, utilizing cache if available.
   * 
   * @param {string} backtest_id - The ID of the backtest to fetch.
   * @returns {Promise<Object>} The backtest data.
   */
  const getBacktest = async (backtest_id) => {
    if (backtestsCache[backtest_id]) {
      log.debug(`Returning cached data for backtest ID: ${backtest_id}`);
      return backtestsCache[backtest_id];
    } else {
      try {
        const data = await client.getBacktestById(backtest_id)
        if (data) {
          const updatedCache = { ...backtestsCache, [backtest_id]: data };
          setBacktestsCache(updatedCache);
          // sessionStorage.setItem('cachedBacktests', JSON.stringify(updatedCache));
          log.info(`Fetched and cached data for backtest ID: ${backtest_id}`);
          return data;
        } 
      } catch (error) {
        log.error('Error fetching backtest:', error);
        throw error; 
      }
    }
  };

  /**
   * Removes a backtest from the cache.
   * 
   * @param {string} backtest_id - The ID of the backtest to remove.
   */
  const removeBacktest = (backtest_id) => {
    setBacktestsCache(prevCache => {
      const updatedCache = { ...prevCache };
      delete updatedCache[backtest_id];
      log.info(`Removed backtest ID: ${backtest_id} from cache`);
      
      // Set new current backtest
      if (+backtest_id === +currentBacktestId) {
        const newId = Object.keys(updatedCache).length > 0 ? 
                      Object.keys(updatedCache).find(key => key !== backtest_id) : 
                      null;
        setCurrentBacktest(newId);
        // sessionStorage.setItem('currentBacktestId', newId);
      }
      return updatedCache;
    });
  };

  const contextValue = {
    getBacktest,
    removeBacktest,
    currentBacktestId,
    setCurrentBacktest,
    backtestsCache,
    fetchSummaries,
    setGroupedSummaries,
    groupedSummaries
  };

  return (
    <BacktestContext.Provider value={contextValue}>
      {children}
    </BacktestContext.Provider>
  );
};
