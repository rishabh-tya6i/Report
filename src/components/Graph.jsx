import React from 'react';
import {
  PieChart,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Sector
} from 'recharts';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7f50', '#00C49F', '#FFBB28', '#FF8042'];

// Format large numbers
const formatValue = (value) => {
  if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
  return value;
};

// Safe label renderer
const renderCustomizedLabel = ({ name, value, percent, x, y, cx }) => {
  if (!name || isNaN(value) || isNaN(x) || isNaN(y)) return null;

  return (
    <text
      x={x}
      y={y}
      fill="currentColor"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
      fontSize={12}
      className="font-medium"
    >
      {`${name}: ${formatValue(value)} (${(percent * 100).toFixed(1)}%)`}
    </text>
  );
};

// Render sectors with safe checks
const renderSectors = (data, cx, cy) => {
  const total = data.reduce((sum, d) => sum + d.value, 0);
  let startAngle = 0;

  return data.map((entry, index) => {
    if (!entry || isNaN(entry.value)) return null;

    const angle = (entry.value / total) * 360;
    const endAngle = startAngle + angle;
    const customRadius = 100 + index * 20;
    const midAngle = (startAngle + endAngle) / 2;
    const RADIAN = Math.PI / 180;
    const labelRadius = customRadius + 20;
    const x = cx + labelRadius * Math.cos(-midAngle * RADIAN);
    const y = cy + labelRadius * Math.sin(-midAngle * RADIAN);

    const sector = (
      <g key={index}>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={0}
          outerRadius={customRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={COLORS[index % COLORS.length]}
        />
        {renderCustomizedLabel({
          name: entry.name,
          value: entry.value,
          percent: entry.value / total,
          x,
          y,
          cx,
        })}
      </g>
    );

    startAngle = endAngle;
    return sector;
  });
};

const Graph = ({ results = [] }) => {
  // Safely transform results
  const pieData = results
    .map(([underlying, value]) => ({
      name: underlying,
      value: isNaN(Number(value)) ? 0 : Number(value),
    }))
    .filter((entry) => entry.name && !isNaN(entry.value)); // clean entries

  return (
    <div className="w-full max-w-6xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg text-gray-700 dark:text-gray-100 text-sm">
      <h2 className="text-xl font-semibold text-center mb-4">
        Sum of Profit & Loss by Underlying
      </h2>

      <div className="flex flex-col border-2 border-black md:flex-row justify-between items-center">
        <div className="w-2/3 border-neutral-950 rounded-md md:w-50% xl:w-full h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              {renderSectors(pieData, 350, 200)}
              <Tooltip
                formatter={(value, name) => [formatValue(value), name]}
                contentStyle={{
                  backgroundColor: '#f9f9f9',
                  borderRadius: '8px',
                  fontSize: '12px',
                  border: '1px solid #ddd',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="w-full md:w-1/3 px-4 mt-6 md:mt-0">
          <Legend
            layout="vertical"
            verticalAlign="top"
            align="left"
            iconType="circle"
            wrapperStyle={{
              fontSize: '13px',
              lineHeight: '1.75rem',
              color: 'inherit',
            }}
          />
          <ul className="space-y-2">
            {pieData.map((entry, index) => (
              <li key={entry.name} className="flex items-center space-x-2">
                <span
                  className="w-3 h-3 rounded-full inline-block"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                />
                <span>{entry.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Graph;
