import React from 'react';
import { Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from '../component/LoginReg/Login.jsx';
import Home from '../pages/Home.jsx';
import Navbar from '../component/Navbar/Navbar.jsx';
import Register from '../component/LoginReg/Register.jsx';
import ContactUs from '../component/Contact/ContactUs.jsx';
import About from '../aboutUs/About.jsx';
import Profile from '../component/profile/profile.jsx';
import ShowDataset from '../component/UploadData/ShowDataset.jsx';
import Graph2D from '../component/2dchart/Graph2D.jsx';
import Graph3D from '../component/3dgraph/Graph3D.jsx';
import AdminLoginForm from '../component/LoginReg/AdminLoginForm.jsx';
import Footer from '../footer/Footer.jsx';

const UserRoutes = () => {
    return (
        <div>
            <div>
                <Navbar/>
            </div>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/login" element={<Login/>} />
                <Route path="/admin-login" element={<AdminLoginForm/>} />
                <Route path="/register" element={<Register/>} />
                <Route path="/contact" element={<ContactUs/>} />
                <Route path="/about" element={<About/>} />
                <Route path="/profile" element={<Profile/>} />
                <Route path="/showdataset" element={<ShowDataset/>} />
                <Route path="/2dchart/:id" element={<Graph2D/>} />
                <Route path="/3dgraph/:id" element={<Graph3D/>} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
            <div>
                <Footer/>
            </div>
        </div >
    );
};


export default UserRoutes;


