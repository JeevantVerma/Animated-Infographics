"use client"

import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import Papa from 'papaparse';
import ResponsiveAppBar from '../components/navbar';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface SalesData {
  Year: string;
  Brand: string;
  SalesMillions: string;
}

const SmartphoneSales: React.FC = () => {
  const [chartData, setChartData] = useState<any>({datasets: []});
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/smartphone_sales.csv');
        const text = await response.text();
        
        Papa.parse(text, {
          header: true,
          complete: (results) => {
            const data = results.data as SalesData[];
            const years = Array.from(new Set(data.map(item => item.Year)));
            const brands = Array.from(new Set(data.map(item => item.Brand)));

            const datasets = brands.map(brand => ({
              label: brand,
              data: years.map(year => {
                const entry = data.find(item => item.Year === year && item.Brand === brand);
                return entry ? parseFloat(entry.SalesMillions) : 0;
              }),
              backgroundColor: getRandomColor(),
            }));

            setChartData({
              labels: years,
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
                  text: 'Smartphone Sales by Brand',
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
    <ResponsiveAppBar/>
    <div className="container mx-auto p-10">
      <Bar options={chartOptions} data={chartData} />
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

export default SmartphoneSales;