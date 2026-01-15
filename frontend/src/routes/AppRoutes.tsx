import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import SKUList from '../pages/SKUList';
import ProtectedRoute from './ProtectedRoute';
import { AuthProvider } from '../contexts/AuthContext';

import AppLayout from '../components/Layout/AppLayout';

const AppRoutes: React.FC = () => {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Login />} />

                    {/* Protected Routes wrapped in AppLayout */}
                    <Route element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/skus" element={<SKUList />} />
                    </Route>

                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
};

export default AppRoutes;
