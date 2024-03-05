import React, { useEffect, useRef, useState } from 'react';
import { createChart} from 'lightweight-charts';

const colors = ['white', 'gray', 'red', 'orange', 'purple', 'cyan', 'magenta'];

/**
 * Gets a color from a predefined set based on the index.
 * @param {string} ticker - The ticker symbol (unused in the function but kept for clarity).
 * @param {number} index - The index used to select the color.
 * @returns {string} The selected color.
 */
const getColorForTicker = (ticker, index) => {
    return colors[index % colors.length];
}

/**
 * Initializes and returns a Lightweight Chart instance.
 * 
 * @param {React.MutableRefObject} chartRef - A React ref object that will hold the chart instance.
 * @param {HTMLElement} container - The DOM element container for the chart.
 * @returns {IChartApi} The chart instance created by the Lightweight Charts library.
 */
const initializeChart = (chartRef, container) => {
    if (!chartRef.current) {
        const chart = createChart(container, {
            width: 789,
            height: 400,
            layout: {
            background: { type: 'solid', color: '#1e1e1e' },
            textColor: '#ddd',
            },
            grid: {
                horzLines: { color: '#444' },
                vertLines: { color: '#444' },
            },
            priceScale: {
                borderColor: '#444',
            },
            timeScale: {
                borderColor: '#444',
            },
        });
        chartRef.current = chart;
    }
    return chartRef.current;
};

/**
 * Groups price data by the ticker symbol.
 * 
 * @param {Array<{timestamp: string, symbol: string, close: number}>} priceData - An array of price data objects.
 * @returns {Object} An object with ticker symbols as keys and arrays of price data as values.
 */
const groupPriceDataByTicker = (priceData) => {
    return priceData.reduce((acc, item) => {
        acc[item.symbol] = acc[item.symbol] || [];
        acc[item.symbol].push(item);
        return acc;
    }, {});
  };
  
/**
 * Flattens the signals data structure, mapping trade instructions to their respective timestamps.
 * 
 * @param {Array<{timestamp: string, trade_instructions: Array<{ticker: string, direction: string}>}>} signalsData - An array of signal data objects.
 * @returns {Array<Object>} A flat array where each instruction is associated with its timestamp.
 */
const flattenSignals = (signalsData) => {
    return signalsData.flatMap(signal =>
        signal.trade_instructions.map(instruction => ({
            ...instruction,
            time: signal.time
        }))
    );
};

/**
 * Generates content for the chart legend based on grouped price data by ticker.
 * 
 * @param {Object} groupedByTicker - The grouped price data object returned by groupPriceDataByTicker.
 * @returns {Array<{color: string, ticker: string}>} An array of objects containing ticker symbols and their associated colors for the legend.
 */
const generateLegendContent = (groupedByTicker) => {
    return Object.keys(groupedByTicker).map((ticker, index) => ({
        color: getColorForTicker(ticker, index), // Ensure this function is defined
        ticker: ticker
    }));
};

/**
 * Creates a marker object for a trading signal, specifying its appearance on the chart.
 * 
 * @param {{time: number, action: string, direction: string}} signal - A signal object containing the time, action, and direction of the trade.
 * @returns {Object} A marker object with properties defining its appearance on the chart.
 */
const createMarkerForSignal = (signal) => ({
    time: signal.time,
    position: 'aboveBar',
    color:  (signal.action === 'LONG' || signal.action === "COVER") ? 'green' : 
            (signal.action === 'SHORT' || signal.action === "SELL") ? 'red' : 
            'yellow',
    shape:  (signal.action === 'LONG' || signal.action === "COVER") ? 'arrowUp' : 
            (signal.action === 'SHORT' || signal.action === "SELL") ? 'arrowDown' : 
            'circle',
    text: signal.action,
});

/**
 * Renders a signal chart that displays trading signals overlaid on price data for different tickers.
 * This component utilizes the lightweight-charts library to render the chart. It groups price data
 * by ticker symbol, displays it as line series on the chart, and marks trading signals on these series
 * according to the signals data provided.
 * 
 * @param {Object} props - The component props.
 * @param {Array<{timestamp: number, symbol: string, close: number}>} props.price_data - An array of price data objects, each containing a timestamp (Unix format), symbol (ticker), and close (closing price) properties.
 * @param {Array<{timestamp: number, trade_instructions: Array<{ticker: string, action: string}>}>} props.signals_data - An array of signals data objects, each containing a timestamp and an array of trade instructions. Each instruction includes a ticker and an action ('LONG', 'SHORT', 'COVER', 'SELL', etc.).
 * 
 * @returns {React.ReactElement} A React component that displays the chart and a legend indicating the tickers present in the chart.
 */
function SignalChart({ price_data, signals_data }) {
    const chartContainerRef = useRef(null);
    const chartRef = useRef(null); // To store the chart instance
    const [legendContent, setLegendContent] = useState([]);

    useEffect(() => {
        const chart = initializeChart(chartRef, chartContainerRef.current);
        const groupedByTicker = groupPriceDataByTicker(price_data);
        const flattenedSignals = flattenSignals(signals_data);

        Object.keys(groupedByTicker).forEach((ticker, index) => {
            const series = chart.addLineSeries({
                color: getColorForTicker(ticker, index),
                lineWidth: 2,
                priceLineVisible: false,
                lastValueVisible: false,
            });

            // Set Price Data
            const tickerData = groupedByTicker[ticker].map(item => ({
                time: item.time, // Ensure timestamps are in Unix format
                value: parseFloat(item.close),
            }));
            series.setData(tickerData);

            // Set Signals
            const tickerMarkers = flattenedSignals
                .filter(signal => signal.ticker === ticker)
                .map(createMarkerForSignal);
            series.setMarkers(tickerMarkers);
        });

        setLegendContent(generateLegendContent(groupedByTicker));
    }, [price_data, signals_data]);

    return (
        <div className="border rounded mx-auto my-5" style={{ width: '790px', height: '430px' }}>   
            <div className="flex flex-col h-full">
                <div className="text-darkTextColor py-1 px-2.5 border-b flex justify-between items-center">
                    <div>Signals</div>
                    <div className="flex">                     
                        {legendContent.map((item, index) => (
                            <div key={index} className="mr-4" style={{ color: item.color }}>
                                {item.ticker}
                            </div>
                        ))}
                    </div>
                </div>
                <div ref={chartContainerRef} />
            </div>
        </div>
    );
}

export default SignalChart;
