import { useEffect, useRef } from 'react';
import {
  Chart as ChartJS,
  CategoryScale, LinearScale, PointElement,
  LineElement, Filler, Tooltip, Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const formatDate = (ts, days) => {
  const d = new Date(ts);
  if (days <= 1)  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  if (days <= 30) return d.toLocaleDateString([], { month: 'short', day: 'numeric' });
  return d.toLocaleDateString([], { month: 'short', year: '2-digit' });
};

export default function PriceChart({ chartData, days = 7, coinName }) {
  const chartRef = useRef(null);

  if (!chartData?.prices?.length) {
    return (
      <div className="chart-empty">
        <span>No chart data available</span>
      </div>
    );
  }

  const prices = chartData.prices;
  const labels = prices.map(([ts]) => formatDate(ts, days));
  const values = prices.map(([, v]) => v);

  const isPositive = values[values.length - 1] >= values[0];
  const lineColor  = isPositive ? '#10b981' : '#ef4444';
  const fillColor  = isPositive ? 'rgba(16, 185, 129, 0.08)' : 'rgba(239, 68, 68, 0.08)';

  const data = {
    labels,
    datasets: [{
      label: `${coinName} Price (USD)`,
      data: values,
      borderColor: lineColor,
      backgroundColor: fillColor,
      fill: true,
      borderWidth: 2,
      pointRadius: days <= 1 ? 0 : (days <= 7 ? 2 : 0),
      pointHoverRadius: 5,
      tension: 0.4,
    }],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: 'index', intersect: false },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#1a1b2e',
        borderColor: '#2d2f4a',
        borderWidth: 1,
        titleColor: '#94a3b8',
        bodyColor: '#e2e8f0',
        bodyFont: { family: 'Inter', size: 13 },
        callbacks: {
          label: (ctx) => ` $${ctx.parsed.y.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 6 })}`,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#64748b',
          maxTicksLimit: 8,
          font: { size: 11 },
        },
        grid: { color: 'rgba(45, 47, 74, 0.5)' },
      },
      y: {
        position: 'right',
        ticks: {
          color: '#64748b',
          font: { size: 11 },
          callback: (v) => `$${v >= 1000 ? (v / 1000).toFixed(1) + 'k' : v.toFixed(v >= 1 ? 2 : 4)}`,
        },
        grid: { color: 'rgba(45, 47, 74, 0.5)' },
      },
    },
  };

  return (
    <div style={{ height: '340px', width: '100%' }}>
      <Line ref={chartRef} data={data} options={options} />
    </div>
  );
}
