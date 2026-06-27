import {
    BrowserRouter,
    Navigate,
    Route,
    Routes,
} from "react-router-dom";

import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/DashboardLayout";

import Login from "@/features/auth/pages/Login";
import Register from "@/features/auth/pages/Register";
import Dashboard from "@/features/notes/pages/Dashboard";
import NotFound from "@/pages/NotFound";

import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    element={
                        <PublicRoute>
                            <AuthLayout />
                        </PublicRoute>
                    }
                >
                    <Route path="/login" element={<Login />} />

                    <Route
                        path="/register"
                        element={<Register />}
                    />
                </Route>

                <Route
                    element={
                        <ProtectedRoute>
                            <DashboardLayout />
                        </ProtectedRoute>
                    }
                >
                    <Route
                        path="/dashboard"
                        element={<Dashboard />}
                    />
                </Route>

                <Route
                    path="/"
                    element={<Navigate to="/dashboard" replace />}
                />

                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}