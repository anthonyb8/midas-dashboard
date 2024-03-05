import React, { useState } from 'react';
import { usePagination } from '../hooks/usePagination';

/**
 * Displays trade data in a paginated table.
 * 
 * @param {{ trades_data: Array<{timestamp: string, trade_id: number, leg_id: number, symbol: string, quantity: number, price: number, cost: number, direction: string}> }} props - Component props.
 */
function TradeTable({ trades_data }) {
  const { currentItems, goToNextPage, goToPreviousPage, currentPage, totalPages } = usePagination(trades_data, 20);

  return (
    <>
      <table className="w-full border-collapse border-spacing-0 text-left">
        <thead>
          <tr>
            <th className="py-2 px-3 border-b ">Timestamp</th>
            <th className="py-2 px-3 border-b ">Trade ID</th>
            <th className="py-2 px-3 border-b ">Leg ID</th>
            <th className="py-2 px-3 border-b ">Ticker</th>
            <th className="py-2 px-3 border-b ">Quantity</th>
            <th className="py-2 px-3 border-b ">Price</th>
            <th className="py-2 px-3 border-b ">Cost</th>
            <th className="py-2 px-3 border-b ">Action</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((trade, index) => (
             <tr key={index}>
             <td className={`py-2 px-3 border-b`}>{trade.timestamp}</td>
             <td className={`py-2 px-3 border-b`}>{trade.trade_id}</td>
             <td className={`py-2 px-3 border-b`}>{trade.leg_id}</td>
             <td className={`py-2 px-3 border-b`}>{trade.ticker}</td>
             <td className={`py-2 px-3 border-b`}>{trade.quantity}</td>
             <td className={`py-2 px-3 border-b`}>{trade.price}</td>
             <td className={`py-2 px-3 border-b`}>{trade.cost}</td>
             <td className={`py-2 px-3 border-b`}>{trade.action}</td>
           </tr>

          ))}
        </tbody>
      </table>
      <div className="flex justify-end mt-2.5">
        <button className="ml-1.5" onClick={goToPreviousPage} disabled={currentPage === 1}>&lt;</button>
        <button className="ml-1.5" onClick={goToNextPage} disabled={currentPage === totalPages}>&gt;</button>
      </div>
    </>
  );
}

export default TradeTable;