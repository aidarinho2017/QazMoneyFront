import React, { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthContext, { AuthProvider } from "./AuthContext";
import JobMap from "./components/JobMap.jsx";
import Job from "./components/Job.jsx";
import ProfileView from "./components/ProfileView.jsx";
import ProfileEdit from "./components/ProfileEdit.jsx";
import JobApplications from "./components/JobApplications.jsx";
import Chat from "./components/Chat.jsx";
import ChatList from "./components/ChatList.jsx";
import YourJobs from "./components/YourJobs.jsx";
import OtherJobs from "./components/OtherJobs.jsx";
import Main from "./components/Main.jsx";

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
            <Routes>
                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <OtherJobs />
                        </ProtectedRoute>
                    }
                />
                <Route path="/login" element={<Login />} />
                <Route path="/main" element={<Main/>} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/map" element={<Map />} />
                <Route path="/jobc" element={<Job />} />
                <Route path="/profile_view" element={<ProfileView />} />
                <Route path="/profile_edit" element={<ProfileEdit />} />
                <Route path="/jobs" element={<JobMap />} />
                <Route path="/yourjobs" element={<YourJobs />} />
                <Route path="/" element={<OtherJobs />} />
                <Route path="/chat/:jobId" element={<Chat />} />
                <Route path="/chats" element={<ChatList />} />
                <Route path="/register" element={<RegisterAndLogout />} />
                <Route path="/create" element={<Home />} />
                <Route path="job_apps" element={<JobApplications />} />
                <Route path="*" element={<NotFound />} />
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
