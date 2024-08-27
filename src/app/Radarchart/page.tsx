"use client"
import React from 'react';
import { Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import ResponsiveAppBar from '../components/navbar';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const Page = () => {
  const data = {
    labels: ['Design', 'Development', 'Marketing', 'Sales', 'Support', 'HR'],
    datasets: [
      {
        label: 'Department A',
        data: [65, 75, 70, 80, 60, 90],
        backgroundColor: 'rgba(34, 202, 236, 0.2)',
        borderColor: 'rgba(34, 202, 236, 1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(34, 202, 236, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(34, 202, 236, 1)',
      },
      {
        label: 'Department B',
        data: [54, 65, 60, 70, 50, 80],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(255, 99, 132, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(255, 99, 132, 1)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,  // Explicitly type the position value
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      r: {
        angleLines: {
          display: true,
          color: '#e5e7eb',
        },
        grid: {
          color: '#e5e7eb',
        },
        pointLabels: {
          color: '#374151',
        },
      },
    },
  };

  return (
    <>
    <ResponsiveAppBar/>
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
  <div className="w-full max-w-2xl mx-auto p-8 bg-white shadow-lg rounded-lg">
    <Radar data={data} options={options} />
  </div>
</div>
    </>
  );
};

export default Page;
