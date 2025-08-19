import React from 'react';
import { Router, Route, Routes, Navigate } from 'react-router-dom';
import DashBoard from '../component/Admin/DashBoard.jsx';
import Profile from '../component/profile/profile.jsx';

const UserRoutes = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<DashBoard/>} />
                <Route path="/profile" element={<Profile/>} />
                <Route path="*" element={<Navigate to="/admin" replace />} />
            </Routes>
        </div >
    );
};

export default UserRoutes;