import React, { useState, useEffect } from 'react';
import api from '../api';
import "../styles/Profile.css";
import NavBar from "./NavBar.jsx";

const ProfileEdit = () => {
    const [profile, setProfile] = useState({
        name: '',
        surname: '',
        birthdate: '',
        email: '',
        phone_number: '',
        description: ''
    });

    useEffect(() => {
        api.get('/api/profile/')
            .then(response => {
                setProfile(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the profile!", error);
            });
    }, []);

    const handleChange = (e) => {
        setProfile({
            ...profile,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        api.put('/api/profile/', profile)
            .then(response => {
                alert('Profile updated successfully!');
            })
            .catch(error => {
                console.error("There was an error updating the profile!", error);
            });
    };

    return (
        <div>
            <NavBar />
        <form onSubmit={handleSubmit} className="profile-edit-form">
            <h1>Edit Profile</h1>
            <input
                type="text"
                name="name"
                value={profile.name || ''}
                onChange={handleChange}
                placeholder="Name"
            />
            <input
                type="text"
                name="surname"
                value={profile.surname || ''}
                onChange={handleChange}
                placeholder="Surname"
            />
            <input
                type="date"
                name="birthdate"
                value={profile.birthdate || ''}
                onChange={handleChange}
                placeholder="Birthdate"
            />
            <input
                type="email"
                name="email"
                value={profile.email || ''}
                onChange={handleChange}
                placeholder="Email"
            />
            <input
                type="text"
                name="phone_number"
                value={profile.phone_number || ''}
                onChange={handleChange}
                placeholder="Phone Number"
            />
            <textarea
                name="description"
                value={profile.description || ''}
                onChange={handleChange}
                placeholder="Description"
            ></textarea>
            <button type="submit">Save</button>
        </form>
        </div>
    );
};

export default ProfileEdit;
