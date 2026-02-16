import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../views/auth/Login";
import Register from "../views/auth/Register";

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                {/* Tambahkan route lain di sini sayangg */}
            </Routes>
        </BrowserRouter>
    );
}
