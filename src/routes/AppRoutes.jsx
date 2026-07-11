import { Routes, Route, Navigate } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";
import Dashboard from "../pages/Dashboard";
import ServiceProvider from "../pages/ServiceProvider";

export default function AppRoutes() {
    return (
        <Routes>
            <Route element={<DashboardLayout />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/service-provider" element={<ServiceProvider />} /> </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
}