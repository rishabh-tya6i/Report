import React from 'react';
import { timeParse } from 'd3-time-format';

const parseDate = timeParse('%d-%m-%Y');

const DateWisePnL = ({ dateWisePnL }) => {
  const sortedData = [...dateWisePnL].sort((a, b) => {
    const dateA = parseDate(a.date);
    const dateB = parseDate(b.date);
    return dateA - dateB;
  });

  return (
    <div className="flex flex-wrap justify-start gap-4 p-8 bg-white dark:bg-gray-900 rounded-xl shadow-md text-center transition-colors">
      {sortedData.map((item, index) => {
        const isProfit = item.totalProfit >= 0;

        const bgClass = isProfit
          ? 'bg-green-900/10 border border-green-400'
          : 'bg-red-900/10 border border-red-400';

        const textClass = isProfit ? 'text-green-400' : 'text-red-400';

        return (
          <div
            key={index}
            className={`w-36 h-32 flex flex-col justify-center items-center rounded-lg shadow-sm transition-colors ${bgClass}`}
          >
            <span className="text-sm text-gray-700 dark:text-gray-300">{item.date}</span>
            <span className={`text-lg font-semibold ${textClass}`}>
              ₹{item.totalProfit}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default DateWisePnL;
