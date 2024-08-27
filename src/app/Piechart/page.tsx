"use client"

import React, { useState, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import Papa from 'papaparse';
import ResponsiveAppBar from '../components/navbar';

interface BrowserData {
  Browser: string;
  MarketSharePercent: string;
}

const BrowserMarketShare: React.FC = () => {
  const [chartData, setChartData] = useState<BrowserData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/browser_market_share.csv');
        const text = await response.text();
        
        Papa.parse(text, {
          header: true,
          complete: (results) => {
            console.log('Parsed data:', results.data);
            setChartData(results.data as BrowserData[]);
          },
        });
      } catch (error) {
        console.error('Error fetching or parsing CSV:', error);
      }
    };

    fetchData();
  }, []);

  const options: Highcharts.Options = {
    chart: {
      type: 'pie',
      backgroundColor: 'transparent',
    },
    title: {
      text: 'Browser Market Share',
      style: { color: '#333', fontSize: '24px' },
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
    },
    accessibility: {
      point: {
        valueSuffix: '%',
      },
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.percentage:.1f} %',
        },
      },
    },
    series: [{
      type: 'pie',
      name: 'Market Share',
      colorByPoint: true,
      data: chartData.map((item) => {
        console.log('Processing item:', item);
        return {
          name: item.Browser || 'Unknown',
          y: parseFloat(item.MarketSharePercent || '0')
        };
      }),
    } as Highcharts.SeriesPieOptions],
  };

  if (chartData.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <ResponsiveAppBar />
      <div className="container w-full max-w-6xl mx-auto p-8">
        <HighchartsReact highcharts={Highcharts} options={options} />
      </div>
    </>
  );
};

export default BrowserMarketShare;
