import React, { useState } from "react";
import { Link } from "react-router-dom";
import Comments from "./Comments";
import api from "../api";

const Job = ({ job, onDelete, onPerform }) => {
    const [showComments, setShowComments] = useState(false);

    const handlePerform = () => {
        onPerform(job.id);
    };

    return (
        <li className="job-item">
            <h2 className="job-item-title">{job.title}</h2>
            <p className="job-item-details">{job.description}</p>
            <p className="job-item-details">{job.location}</p>
            <p className="job-item-details">Lat: {job.latitude}, Lng: {job.longitude}</p>
            <p className="job-item-details">Category: {job.category}</p>
            {onDelete && <button onClick={() => onDelete(job.id)}>Delete</button>}
            {onPerform && (
                <>
                    <input
                        type="number"
                        placeholder="Your price"
                    />
                    <button onClick={handlePerform}>Perform</button>
                </>
            )}
            <button onClick={() => setShowComments(!showComments)}>Comments</button>
            {showComments && <Comments jobId={job.id} />}
        </li>
    );
};

export default Job;
