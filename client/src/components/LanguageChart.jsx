import React from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';

const COLORS = ['#0366d6', '#6f42c1', '#28a745', '#fd7e14', '#dc3545', '#20c997', '#e83e8c', '#007bff', '#ffc107', '#17a2b8'];

export default function LanguageChart({ languages }) {
  const chartData = languages.map((lang, index) => ({
    name: lang.name,
    value: parseFloat(lang.percentage),
    count: lang.count
  }));

  const renderCustomTooltip = (props) => {
    if (props.active && props.payload && props.payload[0]) {
      return (
        <div className="bg-white p-2 border border-border rounded shadow-lg">
          <p className="font-semibold">{props.payload[0].name}</p>
          <p className="text-sm text-text-secondary">
            {props.payload[0].value}% ({props.payload[0].payload.count} repos)
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="card">
      <h3 className="text-xl font-semibold mb-6">Language Distribution</h3>
      {chartData.length > 0 ? (
        <>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={renderCustomTooltip} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-6 space-y-2">
            {languages.map((lang, index) => (
              <div key={index} className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <span className="font-medium">{lang.name}</span>
                </div>
                <span className="text-text-secondary text-sm">
                  {lang.percentage}% ({lang.count} repos)
                </span>
              </div>
            ))}
          </div>
        </>
      ) : (
        <p className="text-text-secondary">No language data available</p>
      )}
    </div>
  );
}
