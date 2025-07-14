import React, { useState } from 'react';
import jsonData from '../assets/quantiply_trade_report.json';
import buyData from '../assets/buy_value.json';
import sellData from '../assets/sell_value.json';
import { useReportData } from '../hooks/useReportData';
import Cumulative from '../components/Cumulative';
import Sum from '../components/Sum';
import DayWiseSum from '../components/DayWiseSum';
import DayWiseFilter from '../components/DayWiseFilter';
import DateWisePnL from '@/components/DateWisePnL';
import WinBar from '@/components/WinBar';
import DayWiseGraph from '@/components/DayWiseGraph';

const DaywiseReport = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [filteredBuyData, setFilteredBuyData] = useState([]);
  const [filteredSellData, setFilteredSellData] = useState([]);

  const dataToUse = filteredData.length > 0 ? filteredData : jsonData;
  const buyToUse = filteredBuyData.length > 0 ? filteredBuyData : buyData;
  const sellToUse = filteredSellData.length > 0 ? filteredSellData : sellData;

  const {
    totalPnL,
    totalQuantity,
    totalBuy,
    totalSell,
    dayWisePnL,
    maxProfit,
    maxLoss
  } = useReportData(dataToUse, buyToUse, sellToUse);

  return (
    <div className="min-h-screen px-4 py-6 bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      <div className="max-w-7xl mx-auto flex flex-col gap-6">

        {/* Filter Section */}
        <section className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4">
          <DayWiseFilter
            fields={['algo', 'client', 'dateRange']}
            setFilteredData={setFilteredData}
            setFilteredBuyData={setFilteredBuyData}
            setFilteredSellData={setFilteredSellData}
          />
        </section>

        {/* Custom Daywise Sum Component */}
        <DayWiseSum totalPnL={totalPnL} maxProfit={maxProfit} maxLoss={maxLoss}/>

        {/* {WinBar} */}
        <WinBar />

        {/* Datewise Profit and Loss */}
        <section className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4">
          <DateWisePnL dateWisePnL={dayWisePnL}/>
        </section>
        {/* Summary Section */}
        <section className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4">
          <Sum
            PnL={totalPnL}
            quantity={totalQuantity}
            buyValue={totalBuy}
            sellValue={totalSell}
          />
        </section>

        {/* {DayWiseGraph} */}
        <section>
          <DayWiseGraph dayWisePnL={dayWisePnL} />
        </section>


        {/* Cumulative Chart */}
        <section className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4">
          <Cumulative dayWisePnL={dayWisePnL} width={900} height={400} />
        </section>

      </div>
    </div>
  );
};

export default DaywiseReport;
