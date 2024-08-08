import React, { useState } from "react";
import "../styles/Home.css";
import NavBar from "../components/NavBar";
import JobMap from "../components/JobMap";
import api from "../api.js";

const Home = () => {
    const [title, setTitle] = useState("");
    const [details, setDetails] = useState("");
    const [location, setLocation] = useState("");
    const [coordinates, setCoordinates] = useState([null, null]);
    const [price, setPrice] = useState("");

    const createJob = (e) => {
        e.preventDefault();
        const jobData = {
            title,
            description: details,
            location,
            latitude: coordinates[0],
            longitude: coordinates[1],
            price: parseFloat(price),
        };
        api.post("/api/jobs/", jobData)
            .then((res) => {
                if (res.status === 201) {
                    alert("Job created!");
                }
            })
            .catch((err) => alert("Failed to create job."));
    };

    const handleLocationSelect = (coords) => {
        setCoordinates(coords);
    };

    return (
        <div className="home-container">
            <NavBar />
            <form className="job-form" onSubmit={createJob}>
                <label className="job-form-label" htmlFor="title">Title:</label>
                <input
                    className="job-form-input"
                    type="text"
                    id="title"
                    name="title"
                    required
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                />
                <label className="job-form-label" htmlFor="details">Details:</label>
                <textarea
                    className="job-form-textarea"
                    id="details"
                    name="details"
                    required
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                ></textarea>
                <label className="job-form-label" htmlFor="location">Location:</label>
                <input
                    className="job-form-input"
                    type="text"
                    id="location"
                    name="location"
                    required
                    onChange={(e) => setLocation(e.target.value)}
                    value={location}
                />
                <label className="job-form-label">Select Location on Map:</label>
                <JobMap onLocationSelect={handleLocationSelect} />
                <label className="job-form-label" htmlFor="price">Price:</label>
                <input
                    className="job-form-input"
                    type="number"
                    id="price"
                    name="price"
                    required
                    onChange={(e) => setPrice(e.target.value)}
                    value={price}
                />
                <input className="job-form-submit" type="submit" value="Submit" />
            </form>
        </div>
    );
};

export default Home;

