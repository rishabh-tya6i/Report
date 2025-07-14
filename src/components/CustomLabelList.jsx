import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LabelList,
  ResponsiveContainer
} from 'recharts';

const CustomLabelList = (props) => {
  const { x, y, width, height, value } = props;
  const padding = 4;
  const fontSize = 12;

  if (value == null) return null;

  const textWidth = `${value}`.length * (fontSize * 0.6);

  return (
    <g>
      {/* Background rectangle */}
      <rect
        x={x + width / 2 - textWidth / 2 - padding}
        y={y - fontSize - padding}
        width={textWidth + 2 * padding}
        height={fontSize + 2 * padding}
        fill="#fff"
        stroke="#333"
        rx={4}
      />
      {/* Text value */}
      <text
        x={x + width / 2}
        y={y - 6}
        fill="#333"
        fontSize={fontSize}
        textAnchor="middle"
        dominantBaseline="middle"
      >
        {value}
      </text>
    </g>
  );
};

export default CustomLabelList