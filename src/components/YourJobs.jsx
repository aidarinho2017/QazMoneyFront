// YourJobs.jsx

import React, { useState, useEffect } from "react";
import api from "../api";
import NavBar from "../components/NavBar";
import Job from "../components/Job";
import "../styles/Home.css";

const YourJobs = () => {
    const [yourJobs, setYourJobs] = useState([]);

    useEffect(() => {
        getYourJobs();
    }, []);

    const getYourJobs = () => {
        api.get("/api/your-jobs/")
            .then((res) => setYourJobs(res.data))
            .catch((err) => alert(err));
    };

    const deleteJob = (id) => {
        api.delete(`/api/jobs/${id}/`)
            .then((res) => {
                if (res.status === 204) {
                    alert("Job deleted!");
                    getYourJobs();
                }
            })
            .catch((error) => alert(error));
    };

    return (
        <div>
            <div>
                <NavBar />
            </div>
            <h2 className="home-header">Your Jobs</h2>
            <ul className="job-list">
                {yourJobs.map((job) => (
                    <Job job={job} onDelete={deleteJob} key={job.id} />
                ))}
            </ul>
        </div>
    );
};

export default YourJobs;

