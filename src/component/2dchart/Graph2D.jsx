import axios from "axios";
import * as XLSX from "xlsx";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_BASE_URL } from "../../utils/apiConfig";
import {
  Bar, Line, Pie, Doughnut, Bubble, PolarArea, Radar, Scatter
} from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

Chart.register(...registerables);

const Graph2D = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [dataSet, setDataSet] = useState([]);
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [chartType, setChartType] = useState("Bar");
  const chartRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (chartRef.current && chartRef.current.canvas) {
      canvasRef.current = chartRef.current.canvas;
    }
  }, [chartData, chartType]);

  useEffect(() => {
    const fetchDataset = async () => {
      try {
        const jwt = localStorage.getItem("jwt");
        const response = await axios.get(`${API_BASE_URL}/dataset/${id}`, {
          headers: { Authorization: `Bearer ${jwt}` },
        });
        setDataSet(response.data);

        if (response.data.fileURL) {
          processExcelFile(response.data.fileURL);
        } else {
          const backgroundColors = generateColors(response.data.manualData[1].Y.length);
          const borderColors = backgroundColors.map((color) =>
            color.replace("0.7", "1")
          );
          setChartData({
            labels: response.data.manualData[0].X,
            datasets: [
              {
                label: response.data?.datasetName || "Dataset Graph",
                data: response.data.manualData[1].Y,
                backgroundColor: backgroundColors,
                borderColor: borderColors,
                borderWidth: 2,
                pointBackgroundColor: backgroundColors,
                pointBorderColor: borderColors,
                pointRadius: 5,
                pointHoverRadius: 7,
                tension: 0.4,
              },
            ],
          });
        }
      } catch (err) {
        setError(err.response?.data?.message || "Error fetching dataset");
      } finally {
        setLoading(false);
      }
    };
    fetchDataset();
  }, [id]);

  const getRandomColor = () => {
    return `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
      Math.random() * 255
    )}, ${Math.floor(Math.random() * 255)}, 0.7)`;
  };

  const generateColors = (length) => {
    return Array.from({ length }, () => getRandomColor());
  };

  const processExcelFile = async (fileURL) => {
    try {
      const jwt = localStorage.getItem("jwt");
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
        setError("Invalid Excel format. Ensure you have X and Y columns.");
        return;
      }

      const xAxis = jsonData.map((row) => row[0]).slice(1);
      const yAxis = jsonData.map((row) => row[1]).slice(1);

      const backgroundColors = generateColors(yAxis.length);
      const borderColors = backgroundColors.map((color) =>
        color.replace("0.7", "1")
      );

      setChartData({
        labels: xAxis,
        datasets: [
          {
            label: dataSet?.datasetName || "Dataset Graph",
            data: yAxis,
            backgroundColor: backgroundColors,
            borderColor: borderColors,
            borderWidth: 2,
            pointBackgroundColor: backgroundColors,
            pointBorderColor: borderColors,
            pointRadius: 5,
            pointHoverRadius: 7,
            tension: 0.4,
          },
        ],
      });
    } catch (error) {
      setError("Error processing Excel file.");
    }
  };

  const renderChart = () => {
    switch (chartType) {
      case "Bar":
        return <Bar ref={chartRef} data={chartData} />;
      case "Bubble":
        return <Bubble ref={chartRef} data={{
          datasets: [{
            label: "Bubble Chart",
            data: chartData?.datasets[0]?.data.map((value, index) => ({
              x: index,
              y: value,
              r: Math.random() * 10 + 5
            })),
            backgroundColor: chartData?.datasets[0]?.backgroundColor,
          }]
        }} />;
      case "Doughnut":
        return <Doughnut ref={chartRef} data={chartData} />;
      case "Pie":
        return <Pie ref={chartRef} data={chartData} />;
      case "Line":
        return <Line ref={chartRef} data={chartData} />;
      case "PolarArea":
        return <PolarArea ref={chartRef} data={chartData} />;
      case "Radar":
        return <Radar ref={chartRef} data={chartData} />;
      case "Scatter":
        return <Scatter ref={chartRef} data={{
          datasets: [{
            label: "Scatter Chart",
            data: chartData?.datasets[0]?.data.map((value, index) => ({
              x: index,
              y: value
            })),
            backgroundColor: chartData?.datasets[0]?.backgroundColor,
          }]
        }} />;
      case "Mixed":
        return (
          <Bar ref={chartRef} data={{
            labels: chartData?.labels,
            datasets: [
              {
                type: "bar",
                label: "Bar Dataset",
                data: chartData?.datasets[0]?.data,
                backgroundColor: "rgba(54, 162, 235, 0.5)",
                borderColor: "rgba(54, 162, 235, 1)",
                borderWidth: 2,
              },
              {
                type: "line",
                label: "Line Dataset",
                data: chartData?.datasets[0]?.data,
                borderColor: "rgba(255, 99, 132, 1)",
                borderWidth: 2,
                fill: false,
                pointRadius: 5,
                tension: 0.4,
              }
            ]
          }} />
        );
      default:
        return <Bar ref={chartRef} data={chartData} />;
    }
  };

  const downloadPDF = async () => {
    if (!canvasRef.current) return;
    const canvasImg = await html2canvas(canvasRef.current);
    const imgData = canvasImg.toDataURL("image/png");
    const pdf = new jsPDF("landscape");
    pdf.addImage(imgData, "PNG", 10, 10, 250, 150);
    pdf.save("chart.pdf");
  };

  if (loading) return <p className="text-center h-screen text-[#00acc1] mt-10">Loading...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">Error: {error}</p>;

  return (
    <div className="flex flex-col md:flex-row h-screen min-h-fit pb-10 bg-black text-[#00acc1]">
      
      {/* Sidebar (turns into top bar on mobile) */}
      <aside className="md:w-[20%] w-full bg-black/40 backdrop-blur-md p-4 rounded-xl md:h-full">
        <h3 className="text-xl font-semibold mb-4 text-[#00acc1] tracking-wide">📊 Chart Types</h3>
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-1 gap-3">
          {[
            { name: "Bar", icon: "📊" },
            { name: "Bubble", icon: "🫧" },
            { name: "Doughnut", icon: "🍩" },
            { name: "Pie", icon: "🥧" },
            { name: "Line", icon: "📈" },
            { name: "PolarArea", icon: "🧭" },
            { name: "Radar", icon: "📡" },
            { name: "Scatter", icon: "🎯" },
            { name: "Mixed", icon: "🔄" }
          ].map(({ name, icon }) => (
            <li
              key={name}
              className={`flex items-center justify-center md:justify-start gap-2 p-2 rounded-lg cursor-pointer text-sm sm:text-base md:text-lg transition-all duration-300 ease-in-out
                       ${chartType === name
                  ? "bg-[#00acc1] text-black scale-105 shadow-[0_0_15px_#00acc1]"
                  : "bg-black/50 text-white hover:bg-[#00acc1]/30 hover:shadow-[0_0_12px_#00acc1]"
                }`}
              onClick={() => setChartType(name)}
            >
              <span className="text-lg">{icon}</span>
              <span className="font-medium">{name}</span>
            </li>
          ))}
        </ul>
      </aside>

      {/* Chart Section */}
      <main className="flex-1 flex flex-col flex-wrap-reverse items-center">
        {/* Header + Actions */}
        <div className="w-full md:w-[90%] mt-4 mb-4 px-4 flex flex-col md:flex-row md:items-center justify-between gap-3">
          <h2 className="text-xl sm:text-2xl font-bold text-center md:text-left">{dataSet?.datasetName || "2D Chart"}</h2>
          <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-end">
            <button
              className="px-4 py-2 bg-[#00acc1] hover:bg-[#008b9a] text-black rounded-md transition text-sm sm:text-base"
              onClick={downloadPDF}
            >
              Download PDF
            </button>
            <button
              className="px-4 py-2 bg-[#00acc1] hover:bg-[#008b9a] text-black rounded-md transition text-sm sm:text-base"
              onClick={() =>
                navigate(`/3dgraph/${id}`, { state: { chartData, chartType } })
              }
            >
              View 3D Graph
            </button>
          </div>
        </div>

        {/* Chart */}
        <div className="bg-black/40 backdrop-blur-md p-4 rounded-lg shadow-[0_0_30px_#00acc1] w-[95%] h-[70vh] flex justify-center items-center overflow-x-auto">
          {chartData ? renderChart() : <p>Loading chart...</p>}
        </div>
      </main>
    </div>
  );
};

export default Graph2D;
