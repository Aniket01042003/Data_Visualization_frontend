import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import * as d3 from "d3";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export default function GraphData({ data,prevName }) {
  const mountRef = useRef(null);
  const [graphType, setGraphType] = useState("bar"); // Default graph type

  // console.log("data from graph fdata", data);

  useEffect(() => {
    if (!data || !data.graphConfig || !mountRef.current) return;

    // Clear previous scene
    while (mountRef.current.firstChild) {
      mountRef.current.removeChild(mountRef.current.firstChild);
    }

    // Extract data
    const { labels, values, color } = data.graphConfig;
    // console.log("Graph data from admin ", data.graphConfig);

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff); // Set background to white

    const camera = new THREE.PerspectiveCamera(75, 800 / 600, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });

    renderer.setSize(800, 600);
    mountRef.current.appendChild(renderer.domElement); // Append renderer to DOM

    // Orbit Controls (Enable 360-degree rotation)
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enableRotate = true;
    controls.autoRotate = true; // Enable auto-rotation
    controls.autoRotateSpeed = 1.0; // Control speed

    // Position Camera
    camera.position.set(5, 5, 10);
    camera.lookAt(0, 0, 0);

    // Axes Helper
    const axesHelper = new THREE.AxesHelper(5);
    scene.add(axesHelper);

    // D3 Scales
    const xScale = d3.scaleBand().domain(labels).range([-4, 4]).padding(0.2);
    const yScale = d3.scaleLinear().domain([0, d3.max(values)]).range([0, 5]);

    // Create Graph
    if (graphType === "bar") {
      labels.forEach((label, index) => {
        const barHeight = yScale(values[index]);
        const geometry = new THREE.BoxGeometry(0.5, barHeight, 0.5);
        const material = new THREE.MeshStandardMaterial({ color });
        const bar = new THREE.Mesh(geometry, material);
        bar.position.set(xScale(label), barHeight / 2, 0);
        scene.add(bar);
      });
    } else if (graphType === "scatter") {
      labels.forEach((label, index) => {
        const geometry = new THREE.SphereGeometry(0.2, 16, 16);
        const material = new THREE.MeshStandardMaterial({ color });
        const point = new THREE.Mesh(geometry, material);
        point.position.set(xScale(label), yScale(values[index]), Math.random() * 2 - 1);
        scene.add(point);
      });
    } else if (graphType === "line") {
      const points = labels.map((label, index) => new THREE.Vector3(xScale(label), yScale(values[index]), 0));
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const material = new THREE.LineBasicMaterial({ color });
      const line = new THREE.Line(geometry, material);
      scene.add(line);
    }

    // Lighting
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5, 5, 5).normalize();
    scene.add(light);

    // Animation Loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update(); // Enable rotation effect
      renderer.render(scene, camera);
    };
    animate();

    // Cleanup
    return () => {
      if (mountRef.current) {
        mountRef.current.innerHTML = "";
      }
    };
  }, [data, graphType]);

  return (
    <div>
      <h2 className="text-xl font-semibold">{data.graphConfig?.title}</h2>
      <div>
        <label className="font-semibold mr-2">Select Graph Type:</label>
        <select value={graphType} onChange={(e) => setGraphType(e.target.value)}>
          <option value="bar">3D Bar Chart</option>
          <option value="scatter">3D Scatter Plot</option>
          <option value="line">3D Line Graph</option>
        </select>
      </div>
      <div ref={mountRef}></div>
    </div>
  );
}
