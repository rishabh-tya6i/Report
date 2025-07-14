import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Text,
  Cell,
} from 'recharts';

const Bottom20 = ({ bottom_algos = [] }) => {
  const data = bottom_algos
    .filter((item) => Array.isArray(item) && item.length === 2 && item[0]) // safety filter
    .map(([algo_name, value]) => ({
      name: algo_name,
      value: isNaN(value) ? 0 : Number(value),
      fill: value < 0 ? '#EF4444' : '#16A34A',
    }));

  const renderRightLabel = ({ x, y, index }) => {
    const algo = data[index];
    if (!algo) return null;
    return (
      <Text
        x={x + 250}
        y={y + 5}
        fontSize={10}
        textAnchor="start"
        dominantBaseline="central"
        maxLines={1}
        width={150}
      >
        {algo.name}
      </Text>
    );
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload?.[0]) {
      const { name, value } = payload[0].payload;
      const isNegative = value < 0;
      return (
        <div className="rounded-md px-3 py-2 shadow text-xs bg-white dark:bg-gray-900 border dark:border-gray-700">
          <p className="font-medium">{name}</p>
          <p className={`${isNegative ? 'text-red-500' : 'text-green-600'} font-semibold`}>
            ₹{value}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full max-w-lg h-auto p-4 m-3 bg-white dark:bg-gray-800 rounded-2xl shadow-md text-xs text-gray-800 dark:text-gray-200 font-medium">
      <h2 className="text-center text-sm font-semibold mb-4">Bottom 20 Algo Strategies</h2>

      <BarChart
        width={500}
        height={500}
        data={data}
        layout="vertical"
        margin={{ top: 10, right: 160, bottom: 10, left: 10 }}
      >
        <XAxis type="number" stroke="#ccc" tick={{ fontSize: 10 }} />
        <YAxis type="category" dataKey="name" hide />
        <CartesianGrid stroke="#ccc" strokeDasharray="2 2" />
        <Tooltip cursor={false} content={<CustomTooltip />} />
        <Bar
          dataKey="value"
          barSize={10}
          radius={[4, 4, 4, 4]}
          label={renderRightLabel}
          isAnimationActive={true}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.fill} />
          ))}
        </Bar>
      </BarChart>
    </div>
  );
};

export default Bottom20;
