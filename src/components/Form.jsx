import React, { useState } from "react";
import api from "../api";
import { Link, useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import "../styles/Form.css";
import LoadingIndicator from "./LoadingIndicator";

function Form({ route, method }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const name = method === "login" ? "Login" : "Register";
    const name2 = method === "login" ? "Register" : "Login";
    const name3 = method === "login" ? "/register" : "/login";

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();

        try {
            const res = await api.post(route, { username, password });
            if (method === "login") {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                navigate("/");
            } else {
                navigate("/login");
            }
        } catch (error) {
            alert(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={"body"}>
            <div className="form-page-container">
                <div className="left-section">
                    <h1> Зарабатывай поблизости</h1>
                    <p>Находи работу возле дома, учебы или секции и зарабатывай реальные деньги!</p>
                    <button className="more-button"> Узнать больше</button>
                </div>
                <div className="right-section">
                    <div className="form-circle">
                        <form onSubmit={handleSubmit} className="form-content">
                            <h1>Qasynda</h1>
                            <input
                                className="form-input"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Username"
                            />
                            <input
                                className="form-input"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                            />
                            {loading && <LoadingIndicator/>}
                            <button className="form-button" type="submit">
                                {name}
                            </button>
                            <p>
                                <Link to={name3} className="form-link">{name2}</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
            <nav className="top-nav">
                <Link to="/" className="nav-link left-link">Home</Link>
                <div className="right-links">
                    <Link to="/product" className="nav-link">Product</Link>
                    <Link to="/pricing" className="nav-link">Pricing</Link>
                    <Link to="/contacts" className="nav-link">Contacts</Link>
                </div>
            </nav>
        </div>
    );
}

export default Form;
