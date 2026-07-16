import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function ActivityChart({ reposByYear }) {
  const chartData = Object.entries(reposByYear)
    .map(([year, count]) => ({
      year,
      repositories: count
    }))
    .sort((a, b) => parseInt(a.year) - parseInt(b.year));

  const renderCustomTooltip = (props) => {
    if (props.active && props.payload && props.payload[0]) {
      return (
        <div className="bg-white p-2 border border-border rounded shadow-lg">
          <p className="font-semibold">Year {props.payload[0].payload.year}</p>
          <p className="text-sm text-text-secondary">
            {props.payload[0].value} repositories created
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="card">
      <h3 className="text-xl font-semibold mb-6">Repository Creation Timeline</h3>
      {chartData.length > 0 ? (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e1e4e8" />
            <XAxis dataKey="year" stroke="#586069" />
            <YAxis stroke="#586069" />
            <Tooltip content={renderCustomTooltip} />
            <Bar dataKey="repositories" fill="#0366d6" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <p className="text-text-secondary">No activity data available</p>
      )}
    </div>
  );
}
