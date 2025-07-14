import React, { useState } from 'react';
import jsonData from '../assets/quantiply_trade_report.json';
import buyData from '../assets/buy_value.json';
import sellData from '../assets/sell_value.json';
import Sum from '../components/Sum';
import Filter from '../components/Filter';
import Graph from '../components/Graph';
import Top20 from '../components/Top20';
import Bottom20 from '../components/Bottom20';
import Cumulative from '../components/Cumulative';
import MonthWisePnL from '../components/MonthWisePnL';
import { useReportData } from '../hooks/useReportData';

const Report = () => {
  const [filteredData, setFilteredData] = useState([]);

  const dataToUse = filteredData.length > 0 ? filteredData : jsonData;
  const buyToUse = buyData;
  const sellToUse = sellData;

  const {
    totalPnL,
    totalQuantity,
    totalBuy,
    totalSell,
    results,
    top_algos,
    bottom_algos,
    dayWisePnL,
    monthWisePnL
  } = useReportData(dataToUse, buyToUse, sellToUse);

  return (
    <div className="min-h-screen px-4 py-6 bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      <div className="max-w-7xl mx-auto flex flex-col gap-6">

        {/* Summary Section */}
        <section className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4">
          <Sum
            PnL={totalPnL}
            quantity={totalQuantity}
            buyValue={totalBuy}
            sellValue={totalSell}
          />
        </section>

        {/* Filter Section */}
        <section className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4">
          <Filter
            fields={['broker', 'client', 'algo', 'underlying']}
            setFilteredData={setFilteredData}
          />
        </section>

        {/* Graph Section */}
        <section className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 flex justify-center">
          <Graph results={results} />
        </section>

        {/* Top and Bottom Algos */}
        <section className="flex flex-col rounded-xl shadow-md bg-white dark:bg-gray-800 lg:flex-row justify-between gap-1">
          <div className="m-auto rounded-xl shadow-md p-2">
            <Top20 top_algos={top_algos} />
          </div>
          <div className="m-auto rounded-xl shadow-md p-2">
            <Bottom20 bottom_algos={bottom_algos} />
          </div>
        </section>

        {/* Monthly PnL */}
        <section>
          <MonthWisePnL monthWisePnL={monthWisePnL} />
        </section>

        {/* Cumulative Chart */}
        <section>
          <Cumulative dayWisePnL={dayWisePnL} width={900} height={400} />
        </section>
      </div>
    </div>
  );
};

export default Report;
