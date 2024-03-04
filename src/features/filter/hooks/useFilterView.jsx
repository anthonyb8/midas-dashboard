// src/hooks/useFilterView.js
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { BacktestContext } from '../../../contexts/DataContext';
import log from 'loglevel';

/**
 * A custom hook for managing the filter view in the application. It handles fetching backtest summaries,
 * managing the loading state, handling user selection of strategies, and navigating to detailed views.
 *
 * @returns {Object} An object containing the loading state, grouped summaries by strategy, the currently selected strategy name,
 * a function to set the selected strategy name, and a function to handle clicks on backtest views.
 */
export const useFilterView = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedStrategyName, setSelectedStrategyName] = useState(null);
  const {groupedSummaries, fetchSummaries, setCurrentBacktest } = useContext(BacktestContext);
  
  useEffect(() => {
    const loadBacktestSummaries = async () => {
      log.debug(`Fetching backtest summaries.`);
      setIsLoading(true);
      try {
        const data = await fetchSummaries()
        log.info('Backtest summaries fetched successfully:', data);
        setSelectedStrategyName(Object.keys(data)[0]); 
      } catch (error) {
        log.error('Error fetching summaries:', error);
      }
      setIsLoading(false);
    };
    loadBacktestSummaries();
    
  },[fetchSummaries, groupedSummaries]);
  
  const handleBacktestViewClick = (backtestId) => {
    log.debug(`Backtest view clicked for ID: ${backtestId}`);
    setCurrentBacktest(backtestId);
    navigate('/dashboard');
  };
  
  
  return {
    isLoading,
    groupedSummaries,
    selectedStrategyName,
    setSelectedStrategyName,
    handleBacktestViewClick,
  };
};


// const [groupedSummaries, setGroupedSummaries] = useState({});
// Define the function inside useEffect to avoid ESLint warnings
      // const grouped = groupSummariesByStrategy(data);
      // sessionStorage.setItem('groupedSummaries', JSON.stringify(grouped));
      // setGroupedSummaries(grouped);
    // const groupSummariesByStrategy = (summaries) => {
      //   return summaries.reduce((acc, summary) => {
        //     if (!acc[summary.strategy_name]) {
          //       acc[summary.strategy_name] = [];
          //     }
          //     const parsedParameters = summary.parameters ? JSON.parse(summary.parameters) : null;
          //     acc[summary.strategy_name].push({ ...summary, parameters: parsedParameters });
          //     return acc;
          //   }, {});
          // };
          
          
            //   // const storedSummaries = sessionStorage.getItem('groupedSummaries');
          
            //   if (storedSummaries) {
            //     const parsedSummaries = JSON.parse(storedSummaries);
            //     setGroupedSummaries(parsedSummaries);
            //     setSelectedStrategyName(Object.keys(parsedSummaries)[0]);
            //     setIsLoading(false);
            //   } else {
            //     fetchSummaries();
            //   }
            // }, []);