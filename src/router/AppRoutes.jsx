import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Login from "../views/auth/Login";
import Register from "../views/auth/Register";
import useAuthStore from "../stores/auth";
import { Dashboard } from "../views/admin/Dashboard";
import { BooksManagement } from "../views/admin/Transaksi/BooksManagement";
import { MembersManagement } from "../views/admin/MembersManagement";
import { Transactions } from "../views/admin/Transactions";
import { Settings } from "../views/admin/Settings";
import { StudentDashboard } from "../views/student/Dashboard";

function RequireAdmin({ children }) {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const role = useAuthStore((state) => state.role);

    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    if (role !== "admin") {
        return <Navigate to="/" replace />;
    }

    return children;
}

function RequireStudent({ children }) {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const role = useAuthStore((state) => state.role);

    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    if (role !== "siswa") {
        return <Navigate to="/" replace />;
    }

    return children;
}

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                    path="/admin/dashboard"
                    element={
                        <RequireAdmin>
                            <Dashboard />
                        </RequireAdmin>
                    }
                />
                <Route
                    path="/admin/books"
                    element={
                        <RequireAdmin>
                            <BooksManagement />
                        </RequireAdmin>
                    }
                />
                <Route
                    path="/admin/members"
                    element={
                        <RequireAdmin>
                            <MembersManagement />
                        </RequireAdmin>
                    }
                />
                <Route
                    path="/admin/transactions"
                    element={
                        <RequireAdmin>
                            <Transactions />
                        </RequireAdmin>
                    }
                />
                <Route
                    path="/admin/settings"
                    element={
                        <RequireAdmin>
                            <Settings />
                        </RequireAdmin>
                    }
                />
                <Route
                    path="/siswa/dashboard"
                    element={
                        <RequireStudent>
                            <StudentDashboard />
                        </RequireStudent>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}
