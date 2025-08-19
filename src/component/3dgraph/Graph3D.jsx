import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { useLocation, useParams } from "react-router-dom";
import { API_BASE_URL } from "../../utils/apiConfig";
import * as THREE from "three";
import * as d3 from "d3";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const graphTypes = [
    { name: "Bar", icon: "📊" },
    { name: "Line", icon: "📈" },
    { name: "Scatter", icon: "🎯" }
];

const Graph3D = () => {
    const location = useLocation();
    const { id } = useParams();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const chartData = location.state?.chartData;
    const mountRef = useRef(null);
    const [graphType, setGraphType] = useState("Bar");
    const [graphConfig, setGraphConfig] = useState(null);

    // Fetch graph config
    useEffect(() => {
        const fetchGraphData = async () => {
            try {
                setLoading(true);
                const jwt = localStorage.getItem("jwt");
                const requestBody = {
                    datasetId: id,
                    graphType: graphType,
                    graphConfig: {
                        xAxis: "X",
                        yAxis: "Y",
                        labels: chartData.labels,
                        values: chartData.datasets[0].data,
                        color: "#00acc1",
                        title: "X-Y Axis Data Visualization"
                    }
                };
                const response = await axios.post(
                    `${API_BASE_URL}/graph/create`,
                    requestBody,
                    { headers: { Authorization: `Bearer ${jwt}` } }
                );
                setGraphConfig(response.data.graphConfig);
                setLoading(false);
            } catch (error) {
                setError(error.message || "Error fetching graph data");
                setLoading(false);
            }
        };
        fetchGraphData();
    }, [id, graphType]);

    // Render 3D Graph
    useEffect(() => {
        if (!graphConfig || !mountRef.current) return;

        while (mountRef.current.firstChild) {
            mountRef.current.removeChild(mountRef.current.firstChild);
        }

        const { labels, values, color } = graphConfig;

        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x000000);

        const width = mountRef.current.clientWidth;
        const height = mountRef.current.clientHeight;
        const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(width, height);
        mountRef.current.appendChild(renderer.domElement);

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.autoRotate = true;
        controls.autoRotateSpeed = 1.0;

        camera.position.set(5, 5, 10);
        camera.lookAt(0, 0, 0);

        const axesHelper = new THREE.AxesHelper(5);
        scene.add(axesHelper);

        const xScale = d3.scaleBand().domain(labels).range([-4, 4]).padding(0.2);
        const yScale = d3.scaleLinear().domain([0, d3.max(values)]).range([0, 5]);

        if (graphType === "Bar") {
            labels.forEach((label, index) => {
                const barHeight = yScale(values[index]);
                const geometry = new THREE.BoxGeometry(0.5, barHeight, 0.5);
                const material = new THREE.MeshStandardMaterial({ color });
                const bar = new THREE.Mesh(geometry, material);
                bar.position.set(xScale(label), barHeight / 2, 0);
                scene.add(bar);
            });
        } else if (graphType === "Scatter") {
            labels.forEach((label, index) => {
                const geometry = new THREE.SphereGeometry(0.2, 16, 16);
                const material = new THREE.MeshStandardMaterial({ color });
                const point = new THREE.Mesh(geometry, material);
                point.position.set(
                    xScale(label),
                    yScale(values[index]),
                    Math.random() * 2 - 1
                );
                scene.add(point);
            });
        } else if (graphType === "Line") {
            const points = labels.map(
                (label, index) =>
                    new THREE.Vector3(xScale(label), yScale(values[index]), 0)
            );
            const geometry = new THREE.BufferGeometry().setFromPoints(points);
            const material = new THREE.LineBasicMaterial({ color });
            const line = new THREE.Line(geometry, material);
            scene.add(line);
        }

        const light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(5, 5, 5).normalize();
        scene.add(light);

        const animate = () => {
            requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
        };
        animate();

        return () => {
            if (mountRef.current) mountRef.current.innerHTML = "";
        };
    }, [graphConfig, graphType]);

    // if (loading)
    //     return (
    //         <div className="flex flex-col items-center h-screen justify-center gap-4 bg-gradient-to-br from-black via-gray-900 to-black text-white">
    //             <div className="w-12 h-12 border-4 border-[#00acc1] border-t-transparent rounded-full animate-spin"></div>
    //             <p className="text-lg font-semibold text-gray-200 animate-pulse">
    //                 Loading 3D Graph...
    //             </p>
    //         </div>
    //     );

    if (error) return <p className="text-red-500 text-2xl h-screen ">{error}</p>;

    return (
        <div className="h-screen pb-20 flex flex-col bg-gradient-to-br from-black via-gray-900 to-black text-white">
            {/* Sidebar */}
            <aside className="w-full bg-black/40 backdrop-blur-md p-4 rounded-r-xl  border-r border-[#00acc1]/30">
                <h3 className="text-xl font-semibold mb-4 text-[#00acc1]">
                    📊 Graph Types
                </h3>
                <ul className="flex flex-wrap">
                    {graphTypes.map(({ name, icon }) => (
                        <li
                            key={name}
                            className={`flex items-center gap-3 p-3 pl-10 pr-10 m-2 w-fit rounded-lg cursor-pointer 
                transition-all duration-300 ease-in-out
                ${graphType === name
                                    ? "bg-[#00acc1] text-black scale-105 shadow-[0_0_15px_#00acc1]"
                                    : "bg-black/50 text-white hover:bg-[#00acc1]/30 hover:shadow-[0_0_12px_#00acc1]"
                                }`}
                            onClick={() => setGraphType(name)}
                        >
                            <span className="text-lg">{icon}</span>
                            <span className="font-medium">{name}</span>
                        </li>
                    ))}
                </ul>
            </aside>

            {/* Graph Display shadow-[0_0_20px_#00acc1] */}

            {loading && (<div className="flex flex-col items-center h-screen w-[80%] justify-center gap-4 bg-gradient-to-br from-black via-gray-900 to-black text-white">
                <div className="w-12 h-12 border-4 border-[#00acc1] border-t-transparent rounded-full animate-spin"></div>
                <p className="text-lg font-semibold text-gray-200 animate-pulse">
                    Loading 3D Graph...
                </p>
            </div>)}
            {!loading && (
                <div className="flex-1 flex justify-center items-center p-2">
                    <div
                        ref={mountRef}
                        className="w-full h-[70vh] sm:w-[95%] sm:h-[75vh] md:w-[90%] md:h-[80vh] lg:w-[85%] lg:h-[85vh] rounded-lg shadow-lg border border-[#00acc1]/20"
                    ></div>
                </div>
            )}
        </div>
    );
};

export default Graph3D;
