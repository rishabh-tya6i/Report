import React, { useState } from 'react';
import jsonData from '../assets/quantiply_trade_report.json';

const DayWiseFilter = ({ setFilteredData }) => {
  const [algo, setAlgo] = useState('All');
  const [client, setClient] = useState('All');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleSearch = () => {
    const filtered = jsonData.filter((item) => {
      const itemDate = new Date(item.date);
      const inDateRange = (!startDate || itemDate >= new Date(startDate)) &&
                          (!endDate || itemDate <= new Date(endDate));

      return inDateRange &&
             (algo === 'All' || item.algo_name === algo) &&
             (client === 'All' || item.client_id === client);
    });

    setFilteredData(filtered);
  };

  return (
    <div className="flex flex-col md:flex-row md:flex-wrap gap-4 justify-between p-4 bg-white dark:bg-gray-900 rounded-xl shadow-md transition-colors">
      
      {/* Start Date */}
      <div className="flex flex-col gap-1 w-full md:w-[220px]">
        <label className="text-sm text-gray-600 dark:text-gray-300 font-medium">Start Date</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="p-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white dark:border-gray-600"
        />
      </div>

      {/* End Date */}
      <div className="flex flex-col gap-1 w-full md:w-[220px]">
        <label className="text-sm text-gray-600 dark:text-gray-300 font-medium">End Date</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="p-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white dark:border-gray-600"
        />
      </div>

      {/* Algo Select */}
      <div className="flex flex-col gap-1 w-full md:w-[220px]">
        <label className="text-sm text-gray-600 dark:text-gray-300 font-medium">Algo</label>
        <select
          value={algo}
          onChange={(e) => setAlgo(e.target.value)}
          className="p-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white dark:border-gray-600"
        >
          <option value="All">All</option>
          <option value="DL024 BN_CE_ RATIO_500/800_MON">DL024 BN_CE_ RATIO_500/800_MON</option>
        </select>
      </div>

      {/* Client Select */}
      <div className="flex flex-col gap-1 w-full md:w-[220px]">
        <label className="text-sm text-gray-600 dark:text-gray-300 font-medium">Client ID</label>
        <select
          value={client}
          onChange={(e) => setClient(e.target.value)}
          className="p-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white dark:border-gray-600"
        >
          <option value="All">All</option>
          <option value="DLL649">DLL649</option>
          <option value="DLL650">DLL650</option>
        </select>
      </div>

      {/* Search Button */}
      <div className="flex items-end w-full md:w-[220px]">
        <button
          onClick={handleSearch}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl transition-all"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default DayWiseFilter;
