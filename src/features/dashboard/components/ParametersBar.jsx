import React from "react";

/**
 * Displays a bar with key parameters of a backtest, including start and end dates, symbols, and capital.
 * 
 * @param {Object} props - Component props.
 * @param {Object} props.parameters - The parameters to display in the bar.
 * @param {string} props.parameters.start_date - The start date of the backtest.
 * @param {string} props.parameters.end_date - The end date of the backtest.
 * @param {Array<string>} props.parameters.tickers - The symbols used in the backtest.
 * @param {number|string} props.parameters.capital - The initial capital for the backtest.
 */
function ParametersBar({ parameters }) {
    return (
        <div className="grid grid-cols-4 text-center py-2.5 mx-1.5 border-t border-b border-darkBorderColor">
            <div className="flex flex-col items-center">
                <div>
                    {parameters.tickers.map((symbol, index) => (
                        <span key={index}>{index > 0 ? ' | ' : ''}{symbol}</span>
                        ))}
                    <div className="uppercase opacity-50 text-sm mb-1.5">SYMBOLS</div>
                </div>
            </div>
            <div className="flex flex-col items-center">
                <div>{parameters?.capital}</div>
                <div className="uppercase opacity-50 text-sm mb-1.5">CAPITAL</div>
            </div>
            <div className="flex flex-col items-center">
                <div>{parameters.test_start}</div>
                <div className="uppercase opacity-50 text-sm mb-1.5">START</div>
            </div>
            <div className="flex flex-col items-center">
                <div>{parameters.test_end}</div>
                <div className="uppercase opacity-50 text-sm mb-1.5">END</div>
            </div>
        </div>
    );
}

export default ParametersBar;

