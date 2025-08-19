import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { Bar, Line, Pie, Doughnut, PolarArea, Radar, Scatter } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { API_BASE_URL } from "../../../utils/apiConfig";
import axios from "axios";
import { useNavigate } from "react-router-dom";

Chart.register(...registerables);

export default function ChartData({ data, prevName }) {
  const navigate = useNavigate();
  const [chartData, setChartData] = useState(null);
  const [chartType, setChartType] = useState("Bar");
  useEffect(() => {
    if (data.fileURL) {
      processExcelFile(data.fileURL);
    } else if (data.manualData) {
      processManualData(data.manualData);
    }
  }, [data]);

  const getRandomColor = () => {
    return `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.7)`;
  };

  const generateColors = (length) => {
    return Array.from({ length }, () => getRandomColor());
  };

  const processExcelFile = async (fileURL) => {
    try {
      const adminInfo = JSON.parse(localStorage.getItem("adminInfo"));
      const jwt = adminInfo?.token;
      const response = await axios.get(`${API_BASE_URL}/${fileURL}`, {
        headers: { Authorization: `Bearer ${jwt}` },
        responseType: "arraybuffer",
      });

      const data = new Uint8Array(response.data);
      const workbook = XLSX.read(data, { type: "array" });

      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

      if (jsonData.length < 2) {
        console.error("Invalid Excel format. Ensure you have X and Y columns.");
        return;
      }

      const xAxis = jsonData.map(row => row[0]).slice(1);
      const yAxis = jsonData.map(row => row[1]).slice(1);
      const backgroundColors = generateColors(yAxis.length);
      const borderColors = backgroundColors.map(color => color.replace("0.7", "1"));

      setChartData({
        labels: xAxis,
        datasets: [
          {
            label: data.datasetName || "Dataset Graph",
            data: yAxis,
            backgroundColor: backgroundColors,
            borderColor: borderColors,
            borderWidth: 2,
            tension: 0.4,
          },
        ],
      });
    } catch (error) {
      console.error("Error processing Excel file.", error);
    }
  };

  const processManualData = (manualData) => {
    if (!manualData || manualData.length === 0) {
      console.error("No manual data provided.");
      return;
    }

    const xAxis = manualData.map((point) => point.X);
    const yAxis = manualData.map((point) => point.Y);
    const backgroundColors = generateColors(yAxis.length);
    const borderColors = backgroundColors.map((color) => color.replace("0.7", "1"));

    setChartData({
      labels: xAxis,
      datasets: [
        {
          label: data.datasetName || "Manual Data Graph",
          data: yAxis,
          backgroundColor: backgroundColors,
          borderColor: borderColors,
          borderWidth: 2,
          tension: 0.4,
        },
      ],
    });
  };

  const renderChart = () => {
    const options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: true },
        tooltip: { enabled: true },
      },
      scales: {
        x: { title: { display: true, text: "X Axis Label" } },
        y: { title: { display: true, text: "Y Axis Label" } },
      },
    };

    const chartProps = { data: chartData, options, width: 1024, height: 512 };

    switch (chartType) {
      case "Bar":
        return <Bar {...chartProps} />;
      case "Line":
        return <Line {...chartProps} />;
      case "Pie":
        return <Pie {...chartProps} />;
      case "Doughnut":
        return <Doughnut {...chartProps} />;
      case "PolarArea":
        return <PolarArea {...chartProps} />;
      case "Radar":
        return <Radar {...chartProps} />;
      case "Scatter":
        return <Scatter {...chartProps} data={{
          datasets: [{
            label: "Scatter Chart",
            data: chartData?.datasets[0]?.data.map((value, index) => ({ x: index, y: value })),
            backgroundColor: chartData?.datasets[0]?.backgroundColor,
          }]
        }} />;
      default:
        return <Bar {...chartProps} />;
    }
  };

  return (
    <div>
      <button
        onClick={() => navigate(-1)}
        // onclick="window.history.back(-1)"
        className="flex items-center gap-2 px-3 py-2 bg-[#00acc1] text-white rounded hover:bg-[#0097a7]"
      >
        <span>⬅</span> Back
      </button>

      <div>{prevName.prevName}/</div>
      <h2 className="text-xl font-semibold">Chart Data for {data.datasetName}</h2>
      {chartData ? (
        <div style={{ width: "1024px", height: "512px" }}>{renderChart()}</div>
      ) : (
        <p>Loading chart...</p>
      )}
      <div className="mt-4">
        <label className="font-semibold mr-2">Select Chart Type:</label>
        <select value={chartType} onChange={(e) => setChartType(e.target.value)}>
          {["Bar", "Line", "Pie", "Doughnut", "PolarArea", "Radar", "Scatter"].map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
