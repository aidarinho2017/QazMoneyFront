import React, { useEffect, useState } from 'react';
import api from '../api';
import { ACCESS_TOKEN } from '../constants';
import "../styles/Clicker.css";
import picture from '../assets/pngegg-19.png';
import Salary from './Salary';

const Clicker = () => {
    const [coins, setCoins] = useState(0);
    const [moneyPerHour, setMoneyPerHour] = useState(0);
    const [remainingTime, setRemainingTime] = useState(0);

    useEffect(() => {
        fetchCoins();
        fetchMoneyPerHour();
    }, []);

    useEffect(() => {
        if (remainingTime > 0) {
            const timer = setInterval(() => {
                setRemainingTime(prevTime => Math.max(prevTime - 1, 0));
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [remainingTime]);

    const fetchCoins = async () => {
        try {
            const token = localStorage.getItem(ACCESS_TOKEN);
            if (!token) {
                console.error("No access token found");
                return;
            }
            const response = await api.get('/api/coins/', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setCoins(response.data.coins);
        } catch (error) {
            console.error("Error fetching coins:", error);
        }
    };

    const fetchMoneyPerHour = async () => {
        try {
            const token = localStorage.getItem(ACCESS_TOKEN);
            if (!token) {
                console.error("No access token found");
                return;
            }
            const response = await api.get('/api/money-per-hour/', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setMoneyPerHour(response.data.money_per_hour);
        } catch (error) {
            console.error("Error fetching money per hour:", error);
        }
    };

    const incrementCoins = async () => {
        try {
            const token = localStorage.getItem(ACCESS_TOKEN);
            if (!token) {
                console.error("No access token found");
                return;
            }
            const response = await api.post('/api/increment/', {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setCoins(response.data.coins);
        } catch (error) {
            console.error("Error incrementing coins:", error);
        }
    };

    const collectMoneyPerMinute = async () => {
        try {
            const token = localStorage.getItem(ACCESS_TOKEN);
            if (!token) {
                console.error("No access token found");
                return;
            }
            const response = await api.post('/api/collect-money-per-minute/', {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setCoins(response.data.coins);
            setRemainingTime(0);
        } catch (error) {
            if (error.response && error.response.data && error.response.data.remaining_time) {
                setRemainingTime(error.response.data.remaining_time);
            } else {
                console.error("Error collecting money per minute:", error);
            }
        }
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    return (
        <div className="clicker-container">
            <h1 className="coin-count">QazMoney</h1>
            <h2 className="coin-count">Money per hour: {moneyPerHour}</h2>
            {remainingTime > 0 ? (
                <p className="timer">Next collection in: {formatTime(remainingTime)}</p>
            ) : (
                <button className="collect-button" onClick={collectMoneyPerMinute}>
                    Collect Money Per Minute
                </button>
            )}
            <Salary updateCoins={setCoins} />
            <h1 className="coin-count">💵 {coins}</h1>
            <h1 className="coin-count">Money for tap: 5</h1>
            <button className="clicker-button" onClick={incrementCoins}>
                <img src={picture} className="img" alt="Click to increment coins" />
            </button>
        </div>
    );
};

export default Clicker;

