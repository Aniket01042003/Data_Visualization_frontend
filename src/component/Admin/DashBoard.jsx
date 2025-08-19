import { useState, useEffect } from "react";
import { AiOutlineAppstore } from "react-icons/ai";
import { FaRegUser } from "react-icons/fa";
import { IoStatsChart } from "react-icons/io5";
import { Gi3dStairs } from "react-icons/gi";
import { LiaClipboardListSolid } from "react-icons/lia";
import { TbDatabaseOff } from "react-icons/tb";
import { FcStatistics } from "react-icons/fc";

import ChartCard from "./ChartCard.jsx";
import SmallChart from "./SmallChart.jsx";
import AdminProfile from "./Profile/AdminProfile.jsx";
import UserProfileList from "./Profile/UserProfileList.jsx";
import DataSetList from "./Dataset/DataSetList.jsx";
import ChartData from "./showdata/ChartData.jsx";
import GraphData from "./showdata/GraphData.jsx";
import StatisticsData from "./showdata/StatisticsData.jsx";
import { useDispatch, useSelector } from "react-redux";
import { adminLogout, fetchDatasets, fetchGraphs, getAdmin } from "../../Redux/Admin/Action";
import FalseData from "./showdata/FalseData.jsx";



export default function DashBoard() {
    const dispatch = useDispatch();
    const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 768);
    const [activeItem, setActiveItem] = useState("Dashboard");
    const jwt = localStorage.getItem("adminJwt");


    function DashboardPage({ filesData }) {
        return <div><SmallChart setActiveItem={setActiveItem} /><ChartCard filesData={filesData} /></div>;
    }
    useEffect(() => {
        dispatch(getAdmin(jwt))
    }, [dispatch, jwt])

    useEffect(() => {
        dispatch(fetchGraphs());
        dispatch(fetchDatasets());
    }, [])

    const graphData = useSelector((store) => store.graphs);
    const graphArray = graphData?.graphs;
    // console.log("graphData", graphArray);

    const fiData = useSelector((store) => store.datasets);
    const filesData = fiData.datasets;
    // console.log("filesData from dashboard", fiData);


    // ✅ Dynamically handle screen resizing
    useEffect(() => {
        const handleResize = () => {
            setIsSidebarOpen(window.innerWidth >= 768);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // ✅ Toggle sidebar function
    const toggleSidebar = (e) => {
        e.stopPropagation();
        setIsSidebarOpen((prev) => !prev);
    };

    // ✅ Close sidebar when clicking outside
    const closeSidebar = (e) => {
        if (window.innerWidth < 768 && !e.target.closest("#sidebar") && !e.target.closest("#open-sidebar")) {
            setIsSidebarOpen(false);
        }
    };
    const handleLogout = () => {
        dispatch(adminLogout)
        localStorage.setItem("adminJwt", " ");
        setTimeout(() => {
            window.location.href = "/"; // Ensures full logout
        }, 1000);
    };

    const admin = useSelector((store) => store.adminLogin?.adminInfo?.admin);
    // console.log(" admin from dashboard ", admin);

    return (
        <div className="bg-gray-100 min-h-screen" onClick={closeSidebar}>
            <div className="h-screen flex overflow-hidden bg-gray-200">

                {/* Sidebar */}
                <div
                    id="sidebar"
                    style={{ backgroundImage: `url('sidebar.jpg')` }}
                    className={`bg-cover bg-center text-white w-64 md:w-72 min-h-screen custom-scrollbar overflow-y-auto 
        fixed md:relative z-30 transform transition-transform duration-300
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
                >
                    <div className="p-4 h-full bg-black bg-opacity-70 z-10">
                        <h1 className="text-lg font-semibold mt-16">Hello Mr. Admin</h1>
                        <ul className="mt-10 text-lg space-y-6">
                            {[
                                { name: "Dashboard", icon: <AiOutlineAppstore className="h-[2rem] w-[20px]" /> },
                                { name: "Admin Profile", icon: <FaRegUser className="h-[2rem] w-[20px]" /> },
                                { name: "User Profile List", icon: <LiaClipboardListSolid className="h-[2rem] w-[20px]" /> },
                                { name: "Chart List", icon: <IoStatsChart className="h-[2rem] w-[20px]" /> },
                                { name: "Manual Data List", icon: <IoStatsChart className="h-[2rem] w-[20px]" /> },
                                { name: "Graph List", icon: <Gi3dStairs className="h-[2rem] w-[20px]" /> },
                                { name: "False Data", icon: <TbDatabaseOff className="h-[2rem] w-[20px]" /> },
                                { name: "Statistics", icon: <FcStatistics className="h-[2rem] w-[20px]" /> },
                            ].map((item) => (
                                <li
                                    key={item.name}
                                    className={`flex items-center gap-3 px-4 py-2 rounded-md cursor-pointer 
                ${activeItem === item.name ? "bg-[#00acc1]" : "hover:bg-gray-700"}`}
                                    onClick={(e) => {
                                        setActiveItem(item.name);
                                        if (window.innerWidth < 768) {
                                            setIsSidebarOpen(false);
                                        }
                                    }}
                                >
                                    {item.icon}
                                    <span className="text-sm">{item.name}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex flex-col flex-1 overflow-hidden transition-all duration-300 md:ml-0">
                    {/* Navbar */}
                    <div className="bg-white shadow">
                        <div className="flex justify-between items-center py-4 px-4 md:px-6">
                            <h1 className="text-lg md:text-xl font-semibold">Welcome To DashBoard</h1>
                            <div className="flex items-center gap-4">
                                {/* Admin profile circle */}
                                <div
                                    onClick={() => setActiveItem("Admin Profile")}
                                    className="bg-slate-700 cursor-pointer rounded-full w-10 h-10 flex items-center justify-center text-lg font-semibold text-white"
                                >
                                    {admin?.role[0]}
                                </div>
                                {/* Logout */}
                                <button
                                    onClick={handleLogout}
                                    className="px-3 md:px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm md:text-base font-medium rounded-lg shadow-md transition-all duration-300"
                                >
                                    Logout
                                </button>
                                {/* Mobile menu button */}
                                <button
                                    className="text-gray-600 hover:text-gray-800 md:hidden"
                                    id="open-sidebar"
                                    onClick={toggleSidebar}
                                >
                                    <svg
                                        className="w-6 h-6"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Dynamic Content */}
                    <div className="flex-1 bg-[#eeeeee] overflow-auto p-4">
                        {activeItem === "Dashboard" && <DashboardPage filesData={filesData} />}
                        {activeItem === "Admin Profile" && <AdminProfile handleLogout={handleLogout} />}
                        {activeItem === "User Profile List" && <UserProfileList filesData={filesData} setActiveItem={setActiveItem} />}
                        {activeItem === "Chart List" && <DataSetList prevName={activeItem} filesData={filesData.filter(file => file.fileURL !== null)} index={0} setActiveItem={setActiveItem} />}
                        {activeItem === "Manual Data List" && <DataSetList prevName={activeItem} filesData={filesData.filter(file => file.fileURL === null)} index={0} setActiveItem={setActiveItem} />}
                        {activeItem === "Graph List" && <DataSetList prevName={activeItem} filesData={graphArray} index={1} setActiveItem={setActiveItem} />}
                        {activeItem === "False Data" && <FalseData />}
                        {activeItem === "Statistics" && <StatisticsData filesData={filesData} />}
                        {activeItem.type === "ChartData" && <ChartData data={activeItem.data} prevName={activeItem.prevName} />}
                        {activeItem.type === "GraphData" && <GraphData data={activeItem.data} prevName={activeItem.prevName} />}
                    </div>
                </div>
            </div>
        </div>

    );
}

