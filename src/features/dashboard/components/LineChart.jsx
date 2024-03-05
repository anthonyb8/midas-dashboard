import React, { useEffect, useRef } from 'react';
import { createChart } from 'lightweight-charts';
import log from 'loglevel';

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
 * Renders a line chart using the lightweight-charts library.
 * 
 * @param {{ data: Array<{ time: string | number, value: number }>, title: string }} props The component props.
 */
function LineChart({ data , title}) {
    const chartContainerRef = useRef(null);
    const chartRef = useRef(null);

    useEffect(() => {
        // Initialize the chart
        const chart = initializeChart(chartRef, chartContainerRef.current);

        // Configure and set data for the series
        const chartSeries = chart.addLineSeries({
            color: 'white',
            lineWidth: 2,
            priceLineVisible: false,
            lastValueVisible: false,
        });

        chartSeries.setData(data); 
    }, [data]);

    if (!data) {
        return <div>Loading...</div>;
    }

    return (
        <div className="border rounded mx-auto my-5" style={{ width: '790px', height: '430px' }}>
            <div className="text-darkTextColor py-1 px-2.5 border-b uppercase">{title}</div>
            <div ref={chartContainerRef} />
        </div>
    );
}

export default LineChart;
