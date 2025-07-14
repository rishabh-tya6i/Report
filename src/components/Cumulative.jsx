import React, { useMemo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LabelList,
  ResponsiveContainer,
} from "recharts";
import { timeParse, timeFormat } from "d3-time-format";
import { color } from "d3";

const parseDate = timeParse("%d-%m-%Y");
const formatDate = timeFormat("%d %b");

const Cumulative = ({ dayWisePnL }) => {
  const data = useMemo(() => {
    let cumulative = 0;

    return [...dayWisePnL]
      .map(({ date, totalProfit }) => ({
        date: parseDate(date),
        rawDate: date,
        profit: totalProfit,
      }))
      .sort((a, b) => a.date - b.date)
      .map(({ date, profit }) => {
        cumulative += profit;
        return {
          date: formatDate(date),
          value: cumulative,
        };
      });
  }, [dayWisePnL]);

  // Calculate offset for gradient split at y=0
  const max = Math.max(...data.map((d) => d.value));
  const min = Math.min(...data.map((d) => d.value));
  const offset = max === min ? 0.5 : max / (max - min);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const { date, value } = payload[0].payload;
      const isNegative = value < 0;
      return (
        <div className="rounded-md px-3 py-2 shadow text-xs bg-white dark:bg-gray-900 border dark:border-gray-700">
          <p className="font-medium">{date}</p>
          <p className={`${isNegative ? 'text-red-500' : 'text-green-600'} font-semibold`}>
            ₹{value}
          </p>
        </div>
      );
    }
    return null;
  };


  return (
    <div className="w-full max-w-full h-96 mx-auto p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-md text-xs text-gray-700 dark:text-gray-200 font-medium">
      <h2 className="text-center text-base font-semibold mb-4 text-gray-800 dark:text-gray-100">Cumulative PnL</h2>

      <ResponsiveContainer width="100%" height={300}>
        <AreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
              <stop offset={offset} stopColor="#16A34A" stopOpacity={1} />
              <stop offset={offset} stopColor="#DC2626" stopOpacity={1} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip content={CustomTooltip}/>
          <Area
            type="monotone"
            dataKey="value"
            stroke="#000"
            fill="url(#splitColor)"
          >
          <LabelList
            dataKey="value"
            content={({ x, y, value }) => {
              const isNegative = value < 0;
              return (
                <text
                  x={x}
                  y={y - 9}
                  textAnchor="middle"
                  fontSize={12}
                  fontWeight="bold"
                  fill={isNegative ? '#DC2626' : '#16A34A'} // red-600 or green-600
                >
                  ₹{value.toLocaleString('en-IN')}
                </text>
              );
            }}
          />
          </Area>
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Cumulative;
