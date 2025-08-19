"use client";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

function Line2AdminChart() {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"], 
    datasets: [
      {
        label: "Sparkline Data",
        data: [10, 20, 40, 20, 40, 10, 50, 80, 40, 20, 60, 40],
        borderColor: "white",
        backgroundColor: "white",
        borderWidth: 5,
        tension: 0.4, // Makes the line smooth
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false }, 
      tooltip: { enabled: false }, 
    },
    scales: {
        x: {
            display: true, // Show X-axis
            title: { display: false, text: "Months", color:"white" }, // X-axis label
            ticks: { color: "rgba(255, 255, 255, 0.61)" }, 
            grid: { color: "rgba(255, 255, 255, 0.31)"},
          },
        y: {
            display: true, // Show Y-axis
            title: { display: false, text: "Sales & Profit", color:"white" }, // Y-axis label
            ticks: { color: "rgba(255, 255, 255, 0.61)" }, 
            grid: { color: "rgba(255, 255, 255, 0.31)" },
          },
    },
  };

  return (
    <div style={{ width: "90%", height: "90%" }}>
      <Line data={data} options={options} />
    </div>
  );
}

export default Line2AdminChart;
