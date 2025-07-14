import React, { useState } from 'react';
import jsonData from '../assets/quantiply_trade_report.json';

const Filter = ({ fields = [], setFilteredData }) => {
  const [broker, setBroker] = useState('All');
  const [client, setClient] = useState('All');
  const [algo, setAlgo] = useState('All');
  const [underlying, setUnderlying] = useState('All');

  const matchesFilter = (item) => {
    return (
      (broker === 'All' || item.broker === broker) &&
      (client === 'All' || item.client_id === client) &&
      (algo === 'All' || item.algo_name === algo) &&
      (underlying === 'All' || item.underlying === underlying)
    );
  };

  const handleSearch = () => {
    const filtered = jsonData.filter(matchesFilter);
    setFilteredData(filtered);
  };

  return (
    <div className="flex flex-wrap justify-around gap-4 p-4 bg-white dark:bg-gray-900 rounded-xl shadow-md transition-colors">
      {/* Broker */}
      {fields.includes('broker') && (
        <div className="flex flex-col gap-1 w-[180px]">
          <label className="text-sm text-gray-600 dark:text-gray-300 font-medium">Broker</label>
          <select
            value={broker}
            onChange={(e) => setBroker(e.target.value)}
            className="p-2 rounded border dark:bg-gray-800 dark:text-white dark:border-gray-600"
          >
            <option value="All">All</option>
            <option value="Abhishek">Abhishek</option>
            <option value="Prashnat">Prashnat</option>
            <option value="Shyam">Shyam</option>
            <option value="Adroit">Adroit</option>
            <option value="Ajay Jain">Ajay Jain</option>
            <option value="jainamxtsa">jainamxtsa</option>
          </select>
        </div>
      )}

      {/* Client */}
      {fields.includes('client') && (
        <div className="flex flex-col gap-1 w-[180px]">
          <label className="text-sm text-gray-600 dark:text-gray-300 font-medium">Client ID</label>
          <select
            value={client}
            onChange={(e) => setClient(e.target.value)}
            className="p-2 rounded border dark:bg-gray-800 dark:text-white dark:border-gray-600"
          >
            <option value="All">All</option>
            <option value="DLL649">DLL649</option>
            <option value="DLL650">DLL650</option>
          </select>
        </div>
      )}

      {/* Algo Name */}
      {fields.includes('algo') && (
        <div className="flex flex-col gap-1 w-[180px]">
          <label className="text-sm text-gray-600 dark:text-gray-300 font-medium">Algo Name</label>
          <select
            value={algo}
            onChange={(e) => setAlgo(e.target.value)}
            className="p-2 rounded border dark:bg-gray-800 dark:text-white dark:border-gray-600"
          >
            <option value="All">All</option>
            <option value="DL024 BN_CE_ RATIO_500/800_MON">DL024 BN_CE_ RATIO_500/800_MON</option>
          </select>
        </div>
      )}

      {/* Underlying */}
      {fields.includes('underlying') && (
        <div className="flex flex-col gap-1 w-[180px]">
          <label className="text-sm text-gray-600 dark:text-gray-300 font-medium">Underlying</label>
          <select
            value={underlying}
            onChange={(e) => setUnderlying(e.target.value)}
            className="p-2 rounded border dark:bg-gray-800 dark:text-white dark:border-gray-600"
          >
            <option value="All">All</option>
            <option value="NiftyBank">Nifty Bank</option>
            <option value="SENSEX">SENSEX</option>
            <option value="Nifty50">NIFTY 50</option>
          </select>
        </div>
      )}

      {/* Search Button */}
      <div className="flex items-end">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default Filter;
