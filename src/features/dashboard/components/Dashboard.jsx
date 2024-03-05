import React from 'react';
import ChartsCollection from './ChartsCollection';
import TablesCollection from './TablesCollection';
import ParametersBar from './ParametersBar';
import { useDashboard } from '../hooks/useDashboard';

/**
 * Dashboard component displaying the selected backtest's details including parameters,
 * charts, and tables of data. Allows users to select different backtests to view.
 */
const Dashboard = () => {
  const { loading, backtestsCache, currentBacktestId, handleTabClick, removeBacktest } = useDashboard();

  return (
    <div className="bg-darkBackground text-darkTextColor min-h-screen p-5">
      {loading ? (
        <p>Loading...</p>
        ) : !currentBacktestId ? (
          <p>Please select a backtest to view its details.</p>
          ) : (
            backtestsCache[currentBacktestId] ? (
              <>
            <div className="flex border-darkBorderColor">
              {Object.keys(backtestsCache).map((id) => (
                <div
                key={id}
                  className={`py-2.5 px-5 cursor-pointer border ${+currentBacktestId === +id ? 'text-gray-300 bg-darkSecondaryBg' : 'text-gray-600 bg-darkBackground'} rounded-tl-md rounded-tr-md mr-0.5 text-sm`}
                  onClick={() => handleTabClick(id)}
                >
                  Backtest {id}
                  <button
                    className="bg-transparent border-none text-gray-200 cursor-pointer text-base p-0 ml-2.5 hover:text-white"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent click from affecting the tab itself
                      removeBacktest(id);
                    }}
                    >
                    x
                  </button>
                </div>
              ))}
            </div>
            <div className="py-2.5 px-5 bg-darkSecondaryBg cursor-pointer border border-b-0 rounded-tl-md rounded-tr-md mr-0.5 text-sm">
              <h1 className="text-gray-300 uppercase text-left text-2xl mb-5">{backtestsCache[currentBacktestId].parameters.strategy_name}</h1>
              <ParametersBar parameters={backtestsCache[currentBacktestId].parameters}/>
              <ChartsCollection timeseries_stats={backtestsCache[currentBacktestId].timeseriesData} price_data={backtestsCache[currentBacktestId].priceData} signal_data={backtestsCache[currentBacktestId].signalData}/> {/* price_data={backtestData.price_data} signals_data={backtestData.signals}/>*/}
              <TablesCollection overview_data={backtestsCache[currentBacktestId].static_stats} trades_data ={backtestsCache[currentBacktestId].trades} signals_data={backtestsCache[currentBacktestId].signalData}/>
            </div>
          </>
        ) : (
          <p>No data available for this backtest.</p>
          )
          )}
    </div>
  );
};

export default Dashboard;

