import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

const AppRoutes: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<div style={{ padding: 20 }}><h1>Inventory Forecaster</h1><p>Welcome to the system.</p></div>} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;
