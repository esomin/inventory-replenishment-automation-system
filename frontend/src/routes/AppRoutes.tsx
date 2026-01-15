import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import ProtectedRoute from './ProtectedRoute';
import AppLayout from '../components/Layout/AppLayout';
import SKUList from '../pages/SKUList';
import PurchaseOrders from '../pages/PurchaseOrders';
// Dashboard component to be implemented in TASK 21, redirecting to SKUs for now or a placeholder

const DashboardRedirect = () => {
    return <Navigate to="/skus" replace />;
};

const AppRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />

            {/* Protected Routes */}
            <Route path="/" element={
                <ProtectedRoute>
                    <AppLayout />
                </ProtectedRoute>
            }>
                <Route index element={<DashboardRedirect />} />
                <Route path="skus" element={<SKUList />} />
                <Route path="purchase-orders" element={<PurchaseOrders />} />

                {/* Fallback */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
        </Routes>
    );
};

export default AppRoutes;
