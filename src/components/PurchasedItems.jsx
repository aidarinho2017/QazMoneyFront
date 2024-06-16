import React, { useEffect, useState, useContext } from 'react';
import api from '../api';
import { ACCESS_TOKEN } from '../constants';
import '../styles/PurchasedItems.css';
import AuthContext from '../AuthContext';

const PurchasedItems = () => {
    const [purchasedItems, setPurchasedItems] = useState([]);
    const [happiness, setHappiness] = useState(0);
    const { isAuthenticated, setCoins } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (isAuthenticated) {
            fetchPurchasedItems();
            fetchHappiness();
        }
    }, [isAuthenticated]);

    const fetchPurchasedItems = async () => {
        try {
            const token = localStorage.getItem(ACCESS_TOKEN);
            if (!token) {
                console.error('No access token found');
                return;
            }
            const response = await api.get('api/user-items/', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setPurchasedItems(response.data);
        } catch (error) {
            console.error('Error fetching purchased items:', error);
        } finally {
            setLoading(false); // Indicate loading completion
        }
    };

    const fetchHappiness = async () => {
        try {
            const token = localStorage.getItem(ACCESS_TOKEN);
            if (!token) {
                console.error('No access token found');
                return;
            }
            const response = await api.get('api/gethappiness/', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setHappiness(response.data.happiness);
        } catch (error) {
            console.error('Error fetching happiness:', error);
        }
    };

    const handleSell = async (userItemId) => {
        try {
            const token = localStorage.getItem(ACCESS_TOKEN);
            if (!token) {
                console.error('No access token found');
                return;
            }
            const response = await api.post(`/api/user-items/${userItemId}/sell/`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            // Update the state to remove the sold item
            setPurchasedItems(purchasedItems.filter(item => item.id !== userItemId));
            // Update the coins and happiness in AuthContext
            setCoins(response.data.coins);
            setHappiness(response.data.happiness);
        } catch (error) {
            console.error('Error selling item:', error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="purchased-items-container">
            <h1>Items</h1>
            <h2>Happiness: {happiness}</h2>
            <ul className="purchased-items-list">
                {purchasedItems.length === 0 ? (
                    <li>No items purchased yet</li>
                ) : (
                    purchasedItems.map(userItem => (
                        <li key={userItem.id} className="purchased-item">
                            <h2>{userItem.item_name}</h2>
                            <p>Selling Price: {userItem.selling_price}</p>
                            <button onClick={() => handleSell(userItem.id)}>Sell</button>
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
};

export default PurchasedItems;

