import React, { useState, useEffect } from "react";
import api from "../api";
import NavBar from "../components/NavBar";
import "../styles/Home.css";
import Job from "../components/Job";
import JobMap from "../components/JobMap";

const OtherJobs = () => {
    const [otherJobs, setOtherJobs] = useState([]);

    useEffect(() => {
        getOtherJobs();
    }, []);

    const getOtherJobs = () => {
        api.get("/api/other-jobs/")
            .then((res) => setOtherJobs(res.data))
            .catch((err) => alert(err));
    };

    const performJob = (jobId) => {
        const suggestedPrice = prompt("Enter your suggested price:");
        if (suggestedPrice) {
            api.post(`/api/jobs/${jobId}/perform_job/`, { suggested_price: suggestedPrice })
                .then((res) => {
                    if (res.status === 200) alert("Job application submitted!");
                    else alert("Failed to submit job application.");
                })
                .catch((err) => alert(err));
        }
    };

    return (
        <div className={"body"}>
            <div>
                <NavBar />
            </div>
            <h1>Available Jobs</h1>
            <JobMap jobs={otherJobs} />
            <ul className="job-list">
                {otherJobs.map((job) => (
                    <Job job={job} onPerform={performJob} key={job.id} />
                ))}
            </ul>
        </div>
    );
};

export default OtherJobs;
