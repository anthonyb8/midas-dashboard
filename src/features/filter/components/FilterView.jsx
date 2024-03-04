import React  from 'react';
import TableLayout from './TableLayout';
import { useFilterView } from '../hooks/useFilterView';
import log from 'loglevel';

/**
 * A component that renders a view for filtering backtest summaries by strategy.
 * It displays a dynamic list of strategy names as buttons. Clicking a button selects a strategy
 * and displays a table layout of backtest summaries for that strategy.
 * 
 * Utilizes the `useFilterView` hook for fetching and managing the state of backtest summaries,
 * including loading state, grouped summaries by strategy, and the currently selected strategy.
 * 
 * @returns {React.ReactElement} The FilterView component.
 */
function FitlerView() {
  const { isLoading, groupedSummaries, selectedStrategyName, setSelectedStrategyName, handleBacktestViewClick } = useFilterView();

  if (isLoading) {
    return <div className="bg-darkBackground text-darkTextColor min-h-screen p-5">Loading...</div>;
  }

  return (
    <div className="bg-darkBackground text-darkTextColor min-h-screen p-5">
      <div className="border border-darkBorderColor rounded mx-auto my-5 mt-12 w-3/4 flex flex-col items-stretch p-2.5">
        <div className="py-2.5 px-4 font-bold border-b border-darkBorderColor">
          {Object.keys(groupedSummaries).map(strategyName => (
            <button
            key={strategyName}
            className={`relative py-2 px-4 cursor-pointer border-none text-base uppercase ${selectedStrategyName === strategyName ? 'text-white' : 'text-gray-700'} outline-none`}
            onClick={() => setSelectedStrategyName(strategyName)}
            >
              {strategyName}
            </button>
          ))}
        </div>
        {selectedStrategyName && <TableLayout strategy={groupedSummaries[selectedStrategyName]} onBacktestViewClick={handleBacktestViewClick} />}
      </div>
    </div>
  );
}

export default FitlerView;