import React, { useEffect, useState } from 'react';
import api from '../api';
import { ACCESS_TOKEN } from '../constants';
import "../styles/Clicker.css";
import picture from '../assets/pngegg-19.png';
import Salary from './Salary';

const Clicker = () => {
    const [coins, setCoins] = useState(0);

    useEffect(() => {
        fetchCoins();
    }, []);

    const fetchCoins = async () => {
        try {
            const token = localStorage.getItem(ACCESS_TOKEN);
            if (!token) {
                console.error("No access token found");
                return;
            }
            console.log("Fetching coins with token:", token);
            const response = await api.get('/api/coins/', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log("Coins response:", response.data);
            setCoins(response.data.coins);
        } catch (error) {
            console.error("Error fetching coins:", error);
        }
    };

    const incrementCoins = async () => {
        try {
            const token = localStorage.getItem(ACCESS_TOKEN);
            if (!token) {
                console.error("No access token found");
                return;
            }
            console.log("Incrementing coins with token:", token);
            const response = await api.post('/api/increment/', {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log("Increment response:", response.data);
            setCoins(response.data.coins);
        } catch (error) {
            console.error("Error incrementing coins:", error);
        }
    };

    return (
        <div className="clicker-container">
            <h1 className="coin-count">QazMoney</h1>
            <Salary updateCoins={setCoins}/>
            <h1 className="coin-count">💵 {coins}</h1>
            <h1 className="coin-count">Money for tap: 5</h1>
            <button className="clicker-button" onClick={incrementCoins}>
                <img src={picture} className="img" alt="Click to increment coins"/>
            </button>
        </div>
    );
};

export default Clicker;
