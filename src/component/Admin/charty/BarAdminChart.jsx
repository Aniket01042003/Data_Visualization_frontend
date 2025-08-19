"use client";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function BarAdminChart({ chartData }) {
  if (!chartData || !chartData.labels) return <p>Loading...</p>; // Handle missing data

  // Generate last 7 days with short day names (Mon, Tue, ...)
  const today = new Date();
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(today.getDate() - i);
    return d.toLocaleDateString("en-US", { weekday: "short" }); // Get day name
  }).reverse(); // Reverse to keep oldest first

  // Map chart data into a lookup object { "Mon": value }
  const dataMap = chartData.labels.reduce((acc, label, index) => {
    acc[new Date(label).toLocaleDateString("en-US", { weekday: "short" })] = chartData.datasets[0].data[index];
    return acc;
  }, {});

  // Ensure all 7 days appear, missing days set to 0
  const dailyValues = last7Days.map((day) => dataMap[day] || 0);

  const data = {
    labels: last7Days, // Show day names instead of dates
    datasets: [
      {
        label: "Daily New User Logins",
        data: dailyValues, // Ensured all 7 days have values
        borderColor: "white", // Green border
        backgroundColor: "white", // Light green fill
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true },
      tooltip: { enabled: true },
    },
    scales: {
      x: {
        display: true,
        ticks: { color: "black" },
        grid: { display: true, color: "rgba(0, 0, 0, 0.1)" }, // Enable grid
      },
      y: {
        display: true,
        beginAtZero: true, // Ensure 0 is visible
        ticks: { color: "black" },
        grid: { display: true, color: "rgba(0, 0, 0, 0.1)" }, // Enable grid
      },
    },
  };

  return (
    <div style={{width: "90%", height: "100%" }}>
      <Bar data={data} options={options} />
    </div>
  );
}

export default BarAdminChart;
