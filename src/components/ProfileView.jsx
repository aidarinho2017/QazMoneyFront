import React, { useEffect, useState } from 'react';
import api from '../api';
import "../styles/Profile.css";
import NavBar from "./NavBar.jsx";

const ProfileView = () => {
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        api.get('/api/profile/')
            .then(response => {
                setProfile(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the profile!", error);
            });
    }, []);

    if (!profile) return <div>Loading...</div>;

    return (
        <div>
            <NavBar />
        <div className="profile-container">
            <div className="profile-header">
                <h1>{profile.name} {profile.surname}</h1>
            </div>
            <div className="profile-details">
                <p><span>Email:</span> {profile.email}</p>
                <p><span>Phone:</span> {profile.phone_number}</p>
                <p><span>Birthdate:</span> {profile.birthdate}</p>
                <p><span>Description:</span> {profile.description}</p>
                <p><span>Jobs Done:</span> {profile.jobs_done}</p>
                <p><span>Jobs Posted:</span> {profile.jobs_posted}</p>
                <p><span>Rating:</span> {profile.rating}</p>
            </div>
        </div>
        </div>
    );
};

export default ProfileView;
