import React, { useState } from 'react';
import OverviewTable from './OverviewTable';
import TradeTable from './TradeTable';
import SignalsTable from './SignalsTable';

/**
 * TablesCollection component that renders a collection of data tables.
 * Allows users to switch between Overview, Trades, and Signals tables.
 *
 * @param {Object} props - Component props.
 * @param {Object[]} props.overview_data - Data for the Overview table.
 * @param {Object[]} props.trades_data - Data for the Trades table.
 * @param {Object[]} props.signals_data - Data for the Signals table.
 */
function TablesCollection({overview_data, trades_data, signals_data}) {
  const [selectedTable, setSelectedTable] = useState('overview');

  return (
    <div className="text-darkTextColor border-darkBorder rounded mx-auto my-5 w-3/4 flex flex-col items-stretch p-2.5">
      <div className="py-2.5 px-4 font-bold border-b ">
        <button className="relative py-2 px-4 cursor-pointer border-none bg-darkSecondaryBg text-base " onClick={() => setSelectedTable('overview')}>Overview</button>
        <button className="relative py-2 px-4 cursor-pointer border-none bg-transparent text-base " onClick={() => setSelectedTable('trades')}>Trades</button>
        <button className="relative py-2 px-4 cursor-pointer border-none bg-transparent text-base " onClick={() => setSelectedTable('signals')}>Signals</button>
      </div>

      {selectedTable === 'overview' && <OverviewTable overview_data={overview_data}/>}
      {selectedTable === 'trades' && <TradeTable trades_data={trades_data} />}
      {selectedTable === 'signals' && <SignalsTable signals_data={signals_data} />} 
    </div>
  );
}

export default TablesCollection;