import React, { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import Clicker from "./components/Clicker";
import NavBar from "./components/NavBar";
import Shop from "./components/Shop.jsx";
import PurchasedItems from "./components/PurchasedItems";
import Salary from "./components/Salary.jsx";
import AuthContext, { AuthProvider } from "./AuthContext";
import Joke from "./components/Joke.jsx";

function Logout() {
    const { logout } = useContext(AuthContext);
    logout();
    return <Navigate to="/login" />;
}

function RegisterAndLogout() {
    const { logout } = useContext(AuthContext);
    logout();
    return <Register />;
}

function App() {
    const { isAuthorized } = useContext(AuthContext);

    return (
        <BrowserRouter>
            <NavBar />
            <Routes>
                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <Clicker />
                        </ProtectedRoute>
                    }
                />
                <Route path="/login" element={<Login />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/register" element={<RegisterAndLogout />} />
                <Route path="/notes" element={<Home />} />
                <Route path="/joke" element={<Joke />} />
                <Route path="*" element={<NotFound />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/getsalary" element={<Salary />} />
                <Route path="/bought" element={<PurchasedItems />} />
            </Routes>
        </BrowserRouter>
    );
}

export default function WrappedApp() {
    return (
        <AuthProvider>
            <App />
        </AuthProvider>
    );
}
