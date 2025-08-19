import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaRegFileLines } from "react-icons/fa6";

import { toast } from "react-toastify";
import { clearDataset, uploadDataset } from "../../Redux/uploadData/Action";
import { useNavigate } from "react-router-dom";

const UploadDataset = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const authState = useSelector((store) => store.auth);
    const token = authState?.jwt;
    // console.log("tokenhii", authState);
    const isAuthenticated = !!token;

    const uploadState = useSelector((store) => store.uploadData);
    // console.log("Upload State:", uploadState); 

    const loading = uploadState?.loading;
    const error = uploadState?.error;
    const dataset = uploadState?.dataset;

    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            toast.info(`Selected file: ${selectedFile.name}`);
        }
    };

        
    const handleUpload = () => {
        if (!isAuthenticated) {
            toast.error("Please log in first.");
            return;
        }
        if (!file) {
            toast.error("Please select a file.");
            return;
        }
        dispatch(uploadDataset(file));
    };      

    useEffect(() => {
        if (dataset) {
            toast.success("Upload successful!");
            setTimeout(() => {
                navigate("/showdataset");
                dispatch(clearDataset());
            }, 1000);
        }
        if (error) {
            toast.error(error);
        }
    }, [dataset,error]);

    return (
        <div className="relative min-h-screen flex items-center justify-center bg-[#0A0A0A]">
            <div className="relative w-full max-w-7xl p-0">
                <div className="grid p-0 lg:grid-cols-2 items-center">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold text-white">
                            Upload <span className="text-cyan-400">Excel File</span>
                        </h1>
                        <p className="text-lg text-white/60 max-w-xl mx-auto lg:mx-0">
                            Upload your dataset to visualize and analyze.
                        </p>
                    </div>

                    {/* File Upload Section */}
                    <div className="relative h-[400px] flex items-center justify-center">
                        <div className="relative w-[300px] rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border border-white/10 shadow-2xl">
                            <div className="w-full py-9 rounded-2xl border border-gray-300 gap-3 grid border-dashed">
                                <div className="flex gap-2 flex-col justify-center items-center">
                                    <FaRegFileLines className="h-[2rem] w-[2rem] text-white" />
                                    <h2 className="text-center text-white text-xs">
                                        Only .xlsx, .xlsm, .xlsb, and .xltx files are allowed.
                                    </h2>
                                </div>
                                <div className="grid gap-2">
                                    <h4 className="text-center text-white text-sm font-medium">
                                        Drag and Drop your file here or
                                    </h4>
                                    <div className="flex items-center justify-center">
                                        <label>
                                            <input
                                                type="file"
                                                hidden
                                                accept=".xlsx, .xlsm, .xlsb, .xltx"
                                                onChange={handleFileChange}
                                            />
                                            <div className="flex w-32 h-9 px-2 flex-col bg-indigo-600 rounded-full shadow text-white text-xs font-semibold items-center justify-center cursor-pointer">
                                                {file?.name ||"Choose File"}
                                            </div>
                                        </label>
                                    </div>
                                    <div>
                                        {/* Upload Button */}
                                        <div className="mt-4 flex justify-center">
                                            <button
                                                onClick={handleUpload}
                                                className="px-6 py-3 bg-gradient-to-r from-violet-600 to-cyan-600 rounded-lg text-white font-medium hover:opacity-80 transition-opacity"
                                                disabled={loading}
                                            >
                                                {loading ? "Uploading..." : "Upload File"}
                                            </button>
                                        </div>

                                        {/* Upload Status
                                        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
                                        {dataset && (
                                            <div className="mt-8 p-4 bg-white rounded-lg shadow">
                                                <h2 className="text-lg font-bold">Uploaded Data Preview</h2>
                                                <pre className="text-xs overflow-x-auto">{JSON.stringify(dataset, null, 2)}</pre>
                                            </div>
                                        )} */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UploadDataset;







// import { React, useEffect } from "react";
// import { FaRegFileLines } from "react-icons/fa6";
// import "tailwindcss/tailwind.css";

// const UploadDataset = () => {
//     useEffect(() => {
//         document.documentElement.style.setProperty("--tw-gradient-stops", "#8b5cf6, #06b6d4");
//     }, []);

//     return (
//         <div className="" >
//             <div className="relative min-h-screen overflow-hidden flex items-center justify-center bg-[#0A0A0A]">
//                 <div className=" inset-0  ">
//                     <div className="absolute inset-0 bg-gradient-to-br from-violet-600/20 via-transparent to-cyan-600/20 opacity-50"></div>
//                     <div className="absolute top-1/4 -left-20 w-[40rem] h-[40rem] bg-gradient-to-br from-violet-600/30 to-fuchsia-600/30 rounded-full blur-3xl animate-float"></div>
//                     <div className="absolute bottom-1/4 -right-20 w-[40rem] h-[40rem] bg-gradient-to-br from-cyan-600/30 to-blue-600/30 rounded-full blur-3xl animate-float" style={{ animationDelay: "-6s" }}></div>
//                     <div className="absolute inset-0 backdrop-blur-[100px]"></div>
//                 </div>
//                 <div className="relative  w-full max-w-7xl p-0 ">
//                     <div className="grid  p-0 lg:grid-cols-2  items-center">
//                         <div className=" text-center lg:text-left">
//                             <div className="animate-reveal [animation-delay:0.2s] flex justify-center lg:justify-start">
//                                 <div className="inline-flex items-center px-3 py-1.5 border border-white/10 rounded-full bg-white/5 backdrop-blur-lg transform hover:scale-105 transition-transform">
//                                     <div className="w-2 h-2 rounded-full bg-violet-500 animate-pulse"></div>
//                                     <span className="ml-2 text-xs sm:text-sm text-white/70 tracking-wider">NEXT GENERATION</span>
//                                 </div>
//                             </div>
//                             <h1 className="text-5xl sm:text-6xl font-bold animate-reveal [animation-delay:0.4s]">
//                                 <span className="bg-gradient-to-r from-violet-300 via-cyan-300 to-violet-300 bg-clip-text text-transparent animate-gradient">Future of</span>
//                                 <span className="block mt-2 text-white">Graph Design</span>
//                             </h1>
//                             <p className="text-lg text-white/60 max-w-xl mx-auto lg:mx-0 animate-reveal [animation-delay:0.6s]">
//                                 Experience the next evolution of digital interfaces. Where minimalism meets innovation, creating seamless and intuitive experiences.
//                             </p>
//                             <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 animate-reveal [animation-delay:0.8s]">
//                                 <button className="relative w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-violet-600 to-cyan-600 rounded-lg text-white font-medium hover:opacity-80 transition-opacity">
//                                     Explore Interface
//                                 </button>
//                                 <button className="w-full sm:w-auto px-6 py-3 rounded-lg border border-white/10 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white transition-all">
//                                     Documentation
//                                 </button>
//                             </div>
//                         </div>
//                         <div className="relative h-[400px] sm:h-[500px] lg:h-[600px] mt-8 lg:mt-0 animate-reveal [animation-delay:1s]">
//                             <div className="absolute inset-0 flex items-center justify-center">
//                                 <div className="relative w-[300px] rounded-2xl animate-morph bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg  border border-white/10 shadow-2xl">
//                                     <div className="w-full py-9  rounded-2xl border border-gray-300 gap-3 grid border-dashed">
//                                         <div className="flex gap-2 flex-col justify-center items-center">
//                                             <FaRegFileLines className="h-[2rem] w-[2rem]  text-white "/>
//                                             <h2 className="text-center text-white text-xs leading-4">
//                                                 only .xlsx, .xlsm, .xlsb, and .xltx
//                                             </h2>
//                                         </div>
//                                         <div className="grid gap-2">
//                                             <h4 className="text-center text-white text-sm font-medium leading-snug">
//                                                 Drag and Drop your file here or
//                                             </h4>
//                                             <div className="flex items-center justify-center">
//                                                 <label>
//                                                     <input type="file" hidden />
//                                                     <div className="flex w-28 h-9 px-2 flex-col bg-indigo-600 rounded-full shadow text-white text-xs font-semibold leading-4 items-center justify-center cursor-pointer focus:outline-none">
//                                                         Choose File
//                                                     </div>
//                                                 </label>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default UploadDataset;


