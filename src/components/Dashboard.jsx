import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import TicketList from "../components/TicketList";   
import "../components/Dashboard.css";

// Recharts imports
import {
  BarChart, Bar,
  PieChart, Pie, Cell,
  LineChart, Line,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  XAxis, YAxis, Tooltip, Legend, ResponsiveContainer
} from "recharts";

export default function Dashboard() {
  const [tickets, setTickets] = useState([]);
  const [showCharts, setShowCharts] = useState(false);

  useEffect(() => {
    axios.get("/tickets/").then((res) => setTickets(res.data));
  }, []);

  // DATA TRANSFORMATIONS
  const byDate = {};
  tickets.forEach(t => {
    const day = new Date(t.created_at).toLocaleDateString();
    byDate[day] = (byDate[day] || 0) + 1;
  });

  const ticketsPerDay = Object.entries(byDate).map(([date, count]) => ({
    date, count
  }));

  const statusCounts = [
    { name: "Raised", value: tickets.filter(t => t.status === "ticket raised").length },
    { name: "Working", value: tickets.filter(t => t.status === "ticket working").length },
    { name: "Hold", value: tickets.filter(t => t.status === "ticket hold").length },
    { name: "Closed", value: tickets.filter(t => t.status === "ticket closed").length }
  ];

  const priorityCounts = [
    { name: "High", value: tickets.filter(t => t.priority === "high").length },
    { name: "Medium", value: tickets.filter(t => t.priority === "medium").length },
    { name: "Low", value: tickets.filter(t => t.priority === "low").length }
  ];

  const statusPriority = ["ticket raised", "ticket working", "ticket hold", "ticket closed"]
    .map(status => ({
      status,
      high: tickets.filter(t => t.status === status && t.priority === "high").length,
      medium: tickets.filter(t => t.status === status && t.priority === "medium").length,
      low: tickets.filter(t => t.status === status && t.priority === "low").length
    }));

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <div className="page">
      <h1>Dashboard</h1>

      {/* Toggle Button */}
      <button
        className="primary"
        onClick={() => setShowCharts(!showCharts)}
        style={{ width: "200px", marginBottom: "20px" }}
      >
        {showCharts ? "Back to List" : "Visualize"}
      </button>

      {/* Toggle Views */}
      {!showCharts ? (
        <TicketList />
      ) : (
        <>
          <div className="chart-grid-3">
            {/* Line Chart */}
            <div className="chart-card">
              <h3>Tickets Per Day</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={ticketsPerDay}>
                  <XAxis dataKey="date" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="count" stroke="#2d5cff" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Donut Chart */}
            <div className="chart-card">
              <h3>Priority Breakdown</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={priorityCounts} cx="50%" cy="50%" outerRadius={110} innerRadius={60} dataKey="value">
                    {priorityCounts.map((entry, idx) => (
                      <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Radar Chart */}
            <div className="chart-card">
              <h3>Status Performance</h3>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={statusCounts}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="name" />
                  <PolarRadiusAxis />
                  <Radar dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Stacked Bar */}
          <div className="chart-grid-1">
            <div className="chart-card">
              <h3>Status vs Priority</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={statusPriority}>
                  <XAxis dataKey="status" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="high" stackId="a" fill="#d90429" />
                  <Bar dataKey="medium" stackId="a" fill="#f28705" />
                  <Bar dataKey="low" stackId="a" fill="#2dbc53" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
