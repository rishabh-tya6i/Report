import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
  LabelList,
  ResponsiveContainer,
} from 'recharts';
import CustomLabelList from './CustomLabelList';

const isDarkMode = document.documentElement.classList.contains('dark');
const MonthWisePnL = ({ monthWisePnL = [] }) => {

    const monthNames = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun','Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    // Prepare data
    const data = monthWisePnL.map(({ month, totalProfit }) => ({
    name: monthNames[Number(month)] || 'Invalid',
    value: totalProfit,
    fill: totalProfit < 0 ? '#EF4444' : '#16A34A',
    }));
    
    console.log(data)
    const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
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
    <div className="w-full max-w-full h-96 mx-auto p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-md text-xs text-gray-900 dark:text-gray-200 font-medium">
      <h2 className="text-center text-base font-semibold mb-4 text-gray-800 dark:text-gray-100">
        Monthwise Profit and Loss
      </h2>
          <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={data}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <XAxis type="category" dataKey="name" />
                <YAxis type="number" dataKey="value"/>
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip cursor={false} content={CustomTooltip}/>
                <Bar
                  dataKey="value"
                  barSize={95}
                  radius={[4, 4, 4, 4]}
                  isAnimationActive={true}>
                    {
                      data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))
                    }
                    <LabelList 
                      dataKey="value" 
                      content={<CustomLabelList/>} 
                    />
                </Bar>
              </BarChart>
          </ResponsiveContainer>
    </div>
  );
};

export default MonthWisePnL;
