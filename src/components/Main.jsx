import React from 'react';
import '../styles/Main.css'; // Assuming you'll add corresponding styles in Main.css
import car from "../assets/lambo.jpeg"
import {Link} from "react-router-dom";

const Main = () => {
    return (
        <div>
            <div className="top-nav">
                <div className="left-links">
                    <a href="/" className="nav-link">Home</a>
                </div>
                <div className="right-links">
                    <a href="/login" className="nav-link">Sign In</a>
                    <a href="/register" className="nav-link">Register</a>
                </div>
            </div>
            <div className="banner">
                <div className="tagline">
                    <h1>Qasynda</h1>
                    <p>Connecting you with quick jobs nearby</p>
                    <Link to="/login">
                        <button className={"button1"}>Start Earning</button>
                    </Link>
                </div>
                <img src={car} alt={"Qasynda"} className="pica"/>
            </div>

            <div className="plan">
                <h2 className="capt">Popular Services</h2>
                <div className="plans">
                    <div className="plans_item">
                        <h2 className="plan_type">Babysitting</h2>
                        <p className="last">Find a trusted babysitter nearby</p>
                        <Link to="/login">
                            <p className="linkerclone2">Explore</p>
                        </Link>
                    </div>
                    <div className="plans_item">
                        <h2 className="plan_type">Dog Walking</h2>
                        <p className="last">Get your dog the walk it needs</p>
                        <Link to="/login">
                            <p className="linkerclone2">Explore</p>
                        </Link>
                    </div>
                    <div className="plans_item">
                        <h2 className="plan_type">Cleaning</h2>
                        <p className="last">Book a cleaner in your area</p>
                        <Link to="/login">
                            <p className="linkerclone2">Explore</p>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="banner2">
                <h1>Find Quick Jobs Nearby</h1>
                <p>Earn money by offering services in your neighborhood</p> <br/>
                <Link to="/login">
                    <button className={"button1"}>Join Qasynda</button>
                </Link>
            </div>
        </div>
    );
};

export default Main;
