import React, { PureComponent } from 'react';
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

export default function Chart(props) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart id="tes-chart" data={props?.data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Bar dataKey={props?.dataKey} fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );
}
