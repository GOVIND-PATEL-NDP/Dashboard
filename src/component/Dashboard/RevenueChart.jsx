import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const RevenueChart = () => {
  const data = [
    { month: "Jan ", revenue: 56093, expenses: 32000 },
    { month: "Feb", revenue: 52093, expenses: 38000 },
    { month: "Mar", revenue: 48093, expenses: 35000 },
    { month: "Apr", revenue: 61093, expenses: 42000 },
    { month: "May", revenue: 56093, expenses: 49000 },
    { month: "Jun", revenue: 67093, expenses: 45000 },
    { month: "Jul", revenue: 72093, expenses: 48000 },
    { month: "Aug", revenue: 69093, expenses: 46000 },
    { month: "Sep", revenue: 74093, expenses: 57000 },
    { month: "Oct", revenue: 76093, expenses: 53000 },
    { month: "Nov", revenue: 82093, expenses: 55000 },
    { month: "Dec", revenue: 89093, expenses: 59000 },
  ];

  return (
    <div className="bg-white/80 dark:bg-slate-900/80 backdrop:blur-xl rounded-b-2xl border border-slate-200/50 dark:border-slate-700/50 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-slate-800 dark:text-white">
            Revenue chart
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Monthly revenue and expenses
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full" />
            <span className="text-sm text-slate-600 dark:text-slate-400">
              Revenue
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-gradient-to-r from-slate-400 to-slate-500 rounded-full" />
            <span className="text-sm text-slate-600 dark:text-slate-400">
              Expense
            </span>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barSize={30} barGap={10}  barCategoryGap="20%">
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#9333ea" />
              </linearGradient>
              <linearGradient id="expensesGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#94a3b8" />
                <stop offset="100%" stopColor="#475569" />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.1} />
            <XAxis dataKey="month" tick={{ fill: "#94a3b8" }} />
            <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
            <Tooltip
              formatter={(value) => `$${value.toLocaleString()}`}
              cursor={{ fill: "rgba(0,0,0,0.05)" }}
            />
            <Bar dataKey="revenue" fill="url(#revenueGradient)" radius={[6, 6, 0, 0]} />
            <Bar dataKey="expenses" fill="url(#expensesGradient)" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RevenueChart;
