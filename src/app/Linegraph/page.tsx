"use client"

import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import Papa from 'papaparse';
import ResponsiveAppBar from '../components/navbar';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface StockData {
  Date: string;
  Company: string;
  ClosingPrice: string;
}

const StockPrices: React.FC = () => {
  const [chartData, setChartData] = useState<any>({ datasets: [] });
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/stock_prices.csv');
        const text = await response.text();

        Papa.parse(text, {
          header: true,
          complete: (results) => {
            const data = results.data as StockData[];
            const dates = Array.from(new Set(data.map(item => item.Date)));
            const companies = Array.from(new Set(data.map(item => item.Company)));

            const datasets = companies.map(company => ({
              label: company,
              data: dates.map(date => {
                const entry = data.find(item => item.Date === date && item.Company === company);
                return entry ? parseFloat(entry.ClosingPrice) : 0;
              }),
              borderColor: getRandomColor(),
              fill: false,
            }));

            setChartData({
              labels: dates,
              datasets: datasets,
            });

            setChartOptions({
              responsive: true,
              plugins: {
                legend: {
                  position: 'top' as const,
                },
                title: {
                  display: true,
                  text: 'Stock Prices Over Time',
                },
              },
            });
          },
        });
      } catch (error) {
        console.error('Error fetching or parsing CSV:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
    <ResponsiveAppBar />
    <div className="container mx-auto p-4">
      <Line options={chartOptions} data={chartData} />
    </div>
    </>
  );
};

// Helper function to generate random colors
function getRandomColor() {
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);
  return `rgba(${r}, ${g}, ${b}, 0.6)`;
}

export default StockPrices;