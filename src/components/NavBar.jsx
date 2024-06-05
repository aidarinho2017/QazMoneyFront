// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import "../styles/NavBar.css";

const Navbar = () => {
    return (
        <nav className="navbar">
            <ul>
                <li><Link to="/">Earn</Link></li>
                <li><Link to="/shop">Shop</Link></li>
                <li><Link to="/bought">Purchased</Link></li>
                <li><Link to="/notes">Notes</Link></li>
                <li><Link to="/logout">Logout</Link></li>
                <li className="select-wrapper">
                    <select name="trading" id="trading" className="navbar-select">
                        <option value="ByBit">ByBit</option>
                        <option value="Binance">Binance</option>
                        <option value="OKX">OKX</option>
                        <option value="BingX">BingX</option>
                        <option value="HTX">HTX</option>
                        <option value="Kucoin">Kucoin</option>
                        <option value="Bitget">Bitget</option>
                        <option value="MEXC">MEXC</option>
                    </select>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;

