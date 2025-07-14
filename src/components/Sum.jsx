import React from 'react';

const SumofPnL = ({ PnL, quantity, sellValue, buyValue }) => {
  const sumPnL = `₹${PnL}`
  return (
    <div className="flex flex-wrap justify-around gap-4 p-4 bg-white dark:bg-gray-900 rounded-xl shadow-md text-center transition-colors">
      {[ 
        { label: 'Sum of Profit & Loss', value: sumPnL },
        { label: 'Sum of Quantity', value: quantity },
        { label: 'Sum of Sell Value', value: sellValue },
        { label: 'Sum of Buy Value', value: buyValue },
      ].map(({ label, value }, index) => (
        <div
          key={index}
          className="w-40 h-24 flex flex-col justify-center items-center 
                     bg-gray-100 dark:bg-gray-800 rounded-lg shadow-sm transition-colors"
        >
          <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
          <h1 className="text-lg font-semibold text-gray-800 dark:text-white">{value}</h1>
        </div>
      ))}
    </div>
  );
};

export default SumofPnL;
