import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

export const options = {
  responsive: true,
  plugins: {},
  maintainAspectRatio: false,
};

export default function NewChart(props) {
  return (
    <Bar
      options={options}
      data={{
        labels: props?.data?.map((item) => item?.date),
        datasets: [
          {
            label: props?.label,
            data: props?.data?.map((item) => item[`${props?.dataKey}`]),
            backgroundColor: 'rgb(130,202,157)',
          },
        ],
      }}
      className="custom-print min-w-0"
    />
  );
}
