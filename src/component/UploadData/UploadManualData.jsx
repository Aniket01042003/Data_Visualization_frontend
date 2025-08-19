import React, { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../utils/apiConfig';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

function UploadManualData() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [xValues, setXValues] = useState('');
    const [yValues, setYValues] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const authState = useSelector((store) => store.auth);
    const token = authState?.jwt;
    const isAuthenticated = !!token;

    const handleSubmit = async () => {
        if (!isAuthenticated) {
            toast.error("Please log in first.");
            return;
        }
        setLoading(true);
        setMessage('');
        
        try {
            const manualData = [
                { X: xValues.split(',').map(Number) },
                { Y: yValues.split(',').map(Number) }
            ];
            // console.log("name Data ", name);
            // console.log("description Data ", description);
            // console.log("manual Data ", manualData);
            // console.log("token ", token);
            
            const { data } = await axios.post(`${API_BASE_URL}/dataset/manual`, {
                name,
                description,
                manualData
            }, {
                headers: { 
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`, 
                }
            });
            
            setMessage('Data uploaded successfully!');
        } catch (error) {
            console.log("error",error)
            setMessage(`Error: ${error.response?.data?.message || 'Something went wrong'}`);
        }
        
        setLoading(false);
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center bg-[#0A0A0A]">
            <div className="relative w-full max-w-7xl p-0">
                <div className="grid p-0 lg:grid-cols-2 items-center">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold text-white">Enter <span className="text-cyan-400">Your Data</span></h1>
                        <p className="text-lg text-white/60 max-w-xl mx-auto lg:mx-0">Enter your data to visualize and analyze.</p>
                    </div>

                    {/* Manual Data Input Section */}
                    <div className="relative h-[400px] flex items-center bottom-10 justify-center">
                        <div className="relative w-[350px] top-20 p-6 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border border-white/10 shadow-2xl">
                            <div className="flex flex-col gap-4">
                                <div>
                                    <label className="text-white text-sm">Dataset Name:</label>
                                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-2 rounded-lg bg-gray-800 text-white mt-1" />
                                </div>
                                <div>
                                    <label className="text-white text-sm">Description:</label>
                                    <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full p-2 rounded-lg bg-gray-800 text-white mt-1" />
                                </div>
                                <div>
                                    <label className="text-white text-sm">X Values (comma separated):</label>
                                    <input type="text" value={xValues} onChange={(e) => setXValues(e.target.value)} className="w-full p-2 rounded-lg bg-gray-800 text-white mt-1" />
                                </div>
                                <div>
                                    <label className="text-white text-sm">Y Values (comma separated):</label>
                                    <input type="text" value={yValues} onChange={(e) => setYValues(e.target.value)} className="w-full p-2 rounded-lg bg-gray-800 text-white mt-1" />
                                </div>
                                <button onClick={handleSubmit} className="w-full px-6 py-3 bg-gradient-to-r from-violet-600 to-cyan-600 rounded-lg text-white font-medium hover:opacity-80 transition-opacity" disabled={loading}>
                                    {loading ? "Uploading..." : "Upload Data"}
                                </button>
                                {message && <p className="text-center text-white mt-2">{message}</p>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UploadManualData;