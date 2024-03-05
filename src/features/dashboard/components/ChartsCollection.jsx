import React from 'react';
import LineChart from './LineChart';
import SignalChart from './SignalChart';
import log from 'loglevel';

/**
 * Represents a collection of charts.
 * @param {Object} props - The properties passed to the component.
 * @param {Array<{timestamp: string, equity_value: number, daily_return: number, cumulative_return: number, percent_drawdown: number}>} props.timeseries_stats - The timeseries statistics, each item containing timestamp, equity_value, daily_return, cumulative_return, and percent_drawdown.
 */
function ChartsCollection({ timeseries_stats, price_data, signal_data }) {
  // Construct Individual arrays
  const equityArray = timeseries_stats.map(item => ({ time: item.timestamp, value: item.equity_value }));
  const dailyReturnArray = timeseries_stats.map(item => ({ time: item.timestamp, value: item.daily_return }));
  const cumReturnArray = timeseries_stats.map(item => ({ time: item.timestamp, value: item.cumulative_return }));
  const drawdownArray = timeseries_stats.map(item => ({ time: item.timestamp, value: item.percent_drawdown }));

  return (
    <div className = "grid grid-cols-2 gap-0 m-0 py-0 bg-defaultBackground text-darkTextColor min-h-screen">
        <LineChart data={equityArray} title={'Equity'} />  {/* Equity Chart */}
        <LineChart data={dailyReturnArray} title={'Return'} />  {/* Return Chart */}
        <LineChart data={drawdownArray} title={'Drawdown'} />  {/* Drawdown Chart */}
        <SignalChart price_data={price_data} signals_data={signal_data}/>  {/* Signal Chart */}
    </div>
  );
}

export default ChartsCollection;
