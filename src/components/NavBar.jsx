// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import "../styles/NavBar.css";

const Navbar = () => {
    return (
        <nav className="navbar">
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/profile_view">Your profile</Link></li>
                <li><Link to="/create">Create jobs</Link></li>
                <li><Link to="/yourjobs">Your Jobs</Link></li>
                <li><Link to="/profile_edit">Update profile</Link></li>
                <li><Link to="/job_apps">Applications</Link></li>
                <li><Link to="/logout">Logout</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;

