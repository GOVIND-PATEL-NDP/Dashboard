import { useEffect, useState } from "react";
import Papa from "papaparse";
import {
  LineChart, Line, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell
} from "recharts";

export default function Dashboard() {
  const  [data, setData] = useState([]);

  useEffect(() => {
    fetch("/EV_Data.csv")
      .then((res) => res.text())
      .then((text) => {
        Papa.parse(text, {
          header: true,
          skipEmptyLines: true,
          dynamicTyping: true,
          complete: (result) => {
            setData(result.data);
          },
        });
      });
  }, []);

  if (data.length === 0) return <p className="text-center mt-10">Loading data...</p>;

  // --- Insights ---
  const totalEVs = data.length;
  const uniqueMakes = [...new Set(data.map(d => d.Make))].length;
  const avgRange = (
    data.reduce((sum, d) => sum + (d["Electric Range"] || 0), 0) / totalEVs
  ).toFixed(1);
  const commonYear = Object.entries(
    data.reduce((acc, d) => {
      acc[d["Model Year"]] = (acc[d["Model Year"]] || 0) + 1;
      return acc;
    }, {})
  ).sort((a, b) => b[1] - a[1])[0][0];

  // --- Charts Data ---
  // Top 10 Makes
  const makeCounts = Object.entries(
    data.reduce((acc, d) => {
      acc[d.Make] = (acc[d.Make] || 0) + 1;
      return acc;
    }, {})
  )
    .map(([make, count]) => ({ make, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  // EVs per Model Year
  const yearCounts = Object.entries(
    data.reduce((acc, d) => {
      acc[d["Model Year"]] = (acc[d["Model Year"]] || 0) + 1;
      return acc;
    }, {})
  ).map(([year, count]) => ({ year, count }));

  // EVs per Type
  const typeCounts = Object.entries(
    data.reduce((acc, d) => {
      acc[d["Electric Vehicle Type"]] = (acc[d["Electric Vehicle Type"]] || 0) + 1;
      return acc;
    }, {})
  ).map(([type, count]) => ({ type, count }));

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Summary Stats */}
      <div className="col-span-1 md:col-span-2 lg:col-span-3 p-4 shadow rounded-lg bg-white">
        <h1 className="text-2xl font-bold mb-4">EV Dataset Dashboard</h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div><p className="text-gray-500">Total EVs</p><p className="text-xl font-bold">{totalEVs}</p></div>
          <div><p className="text-gray-500">Unique Makes</p><p className="text-xl font-bold">{uniqueMakes}</p></div>
          <div><p className="text-gray-500">Avg. Range</p><p className="text-xl font-bold">{avgRange} mi</p></div>
          <div><p className="text-gray-500">Most Common Year</p><p className="text-xl font-bold">{commonYear}</p></div>
        </div>
      </div>

      {/* Top 10 Makes */}
      <div className="p-4 shadow rounded-lg bg-white">
        <h2 className="text-lg font-semibold mb-2">Top 10 EV Makes</h2>
        <BarChart width={300} height={200} data={makeCounts}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="make" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#82ca9d" />
        </BarChart>
      </div>

      {/* EVs over Years */}
      <div className="p-4 shadow rounded-lg bg-white">
        <h2 className="text-lg font-semibold mb-2">EV Registrations by Year</h2>
        <LineChart width={300} height={200} data={yearCounts}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="count" stroke="#8884d8" />
        </LineChart>
      </div>

      {/* EV Type Distribution */}
      <div className="p-4 shadow rounded-lg bg-white">
        <h2 className="text-lg font-semibold mb-2">EV Type Distribution</h2>
        <PieChart width={300} height={200}>
          <Pie data={typeCounts} dataKey="count" nameKey="type" cx="50%" cy="50%" outerRadius={80} label>
            {typeCounts.map((_, index) => (
              <Cell key={index} fill={["#0088FE", "#00C49F", "#FFBB28", "#FF8042"][index % 4]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </div>

      {/* Data Table */}
      <div className="col-span-1 md:col-span-2 lg:col-span-3 p-4 shadow rounded-lg bg-white overflow-auto">
        <h2 className="text-lg font-semibold mb-2">Sample Records</h2>
        <table className="table-auto border-collapse border border-gray-300 w-full text-sm">
          <thead>
            <tr>
              {Object.keys(data[0]).map((key) => (
                <th key={key} className="border border-gray-300 px-2 py-1 bg-gray-100">{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.slice(0, 20).map((row, i) => (
              <tr key={i}>
                {Object.keys(row).map((key) => (
                  <td key={key} className="border border-gray-300 px-2 py-1">
                    {row[key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <p className="text-xs text-gray-500 mt-2">Showing first 20 rows</p>
      </div>
    </div>
  );
}
