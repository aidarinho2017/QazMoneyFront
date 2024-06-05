import React, { useState, useEffect } from 'react';
import api from '../api';
import { ACCESS_TOKEN } from '../constants';
import "../styles/Salary.css";

const Salary = ({ updateCoins }) => {
    const [error, setError] = useState('');
    const [remainingTime, setRemainingTime] = useState(0);

    useEffect(() => {
        if (remainingTime > 0) {
            const timer = setInterval(() => {
                setRemainingTime(prevTime => prevTime - 1);
            }, 1000);

            return () => clearInterval(timer);
        }
    }, [remainingTime]);

    const formatTime = (seconds) => {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hrs}:${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    const getSalary = async () => {
        try {
            const token = localStorage.getItem(ACCESS_TOKEN);
            if (!token) {
                console.error("No access token found");
                setError("No access token found");
                return;
            }
            const response = await api.post('/api/getsalary/', {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            updateCoins(response.data.coins);
            setError('');
        } catch (error) {
            if (error.response && error.response.data) {
                if (error.response.data.error) {
                    setError(error.response.data.error);
                }
                if (error.response.data.remaining_time) {
                    setRemainingTime(error.response.data.remaining_time);
                }
            } else {
                setError("Error getting salary");
                console.error("Error getting salary:", error);
            }
        }
    };

    return (
        <div className="salary-container">
            {error && <p className="error-message">{error}</p>}
            {remainingTime > 0 ? (
                <p className="timer">Next salary in: {formatTime(remainingTime)}</p>
            ) : (
                <button className="salary-button" onClick={getSalary}>
                    Get Daily Salary
                </button>
            )}
        </div>
    );
};

export default Salary;
