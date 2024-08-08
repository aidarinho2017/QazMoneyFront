import React, { useState, useEffect } from "react";
import api from "../api";
import "../styles/JobApplications.css";
import NavBar from "./NavBar.jsx";

const JobApplications = () => {
    const [applications, setApplications] = useState([]);

    useEffect(() => {
        getApplications();
    }, []);

    const getApplications = () => {
        api
            .get("/api/applications/")
            .then((res) => res.data)
            .then((data) => {
                setApplications(data);
            })
            .catch((err) => alert(err));
    };

    const acceptApplication = (id) => {
        api
            .post(`/api/applications/${id}/accept/`)
            .then((res) => {
                if (res.status === 200) {
                    alert("Application accepted!");
                    setApplications(applications.map(application =>
                        application.id === id ? {...application, status: 'accepted', phone_number: res.data.phone_number} : application
                    ));
                } else {
                    alert("Failed to accept application.");
                }
            })
            .catch((error) => alert(error));
    };

    const denyApplication = (id) => {
        api
            .post(`/api/applications/${id}/deny/`)
            .then((res) => {
                if (res.status === 200) {
                    alert("Application denied!");
                    setApplications(applications.map(application =>
                        application.id === id ? {...application, status: 'denied'} : application
                    ));
                } else {
                    alert("Failed to deny application.");
                }
            })
            .catch((error) => alert(error));
    };

    return (
        <div>
            <NavBar />
            <div className="applications-container">
                <h2 className="applications-header">Job Applications</h2>
                <ul className="applications-list">
                    {applications.map((application) => (
                        <li className="application-item" key={application.id}>
                            <p><strong>Job:</strong> {application.job.title}</p>
                            <p><strong>Applicant:</strong> {application.applicant_name}</p>
                            <p><strong>Status:</strong> {application.status}</p>
                            {application.status === 'accepted' && (
                                <p><strong>Phone Number:</strong> {application.phone_number}</p>
                            )}
                            {application.status === 'pending' && (
                                <>
                                    <button onClick={() => acceptApplication(application.id)}>Accept</button>
                                    <button className="deny" onClick={() => denyApplication(application.id)}>Deny</button>
                                </>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default JobApplications;

