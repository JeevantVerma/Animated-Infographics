"use client"
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import ResponsiveAppBar from '../components/navbar';

// Dynamically import Plotly with SSR disabled
const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });

interface DataPoint {
  x: number;
  y: number;
  z: number;
}

const ScatterPlotPage: React.FC = () => {
  const [data, setData] = useState<DataPoint[]>([]);

  useEffect(() => {
    // Generate random data
    const generateRandomData = () => {
      const newData: DataPoint[] = [];
      for (let i = 0; i < 1000; i++) {  // Increased to 1000 points
        newData.push({
          x: Math.random() * 10,
          y: Math.random() * 10,
          z: Math.random() * 10,
        });
      }
      setData(newData);
    };

    generateRandomData();
  }, []);

  const trace1 = {
    x: data.map(point => point.x),
    y: data.map(point => point.y),
    z: data.map(point => point.z),
    mode: 'markers',
    marker: {
      size: 5,  // Reduced size due to increased number of points
      color: data.map(point => point.z),  // Use z value for color
      colorscale: 'Jet',  // Color scale from blue to red
      opacity: 0.8,
      colorbar: {
        title: 'Z Value',
        thickness: 20,
      },
    },
    type: 'scatter3d',
  };

  const layout = {
    margin: { l: 0, r: 0, b: 0, t: 0 },
    scene: {
      xaxis: { title: 'X Axis' },
      yaxis: { title: 'Y Axis' },
      zaxis: { title: 'Z Axis' },
    },
    autosize: true,
  };

  return (
    <>
    <ResponsiveAppBar/>
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>3D Scatter Plot</title>
        <meta name="description" content="3D Scatter Plot using Plotly.js in Next.js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6 text-center">3D Scatter Plot</h1>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="w-full h-[600px]">
            <Plot
              data={[trace1]}
              layout={layout}
              config={{ responsive: true }}
              className="w-full h-full"
            />
          </div>
        </div>
      </main>
    </div>
    </>
  );
};

export default ScatterPlotPage;