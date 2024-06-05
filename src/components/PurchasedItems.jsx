import React, { useEffect, useState, useContext } from 'react';
import api from '../api';
import { ACCESS_TOKEN } from '../constants';
import '../styles/PurchasedItems.css';
import AuthContext from '../AuthContext';

const PurchasedItems = () => {
    const [purchasedItems, setPurchasedItems] = useState([]);
    const { isAuthenticated } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
            if (isAuthenticated) {
                fetchPurchasedItems();
            }
        },
        [isAuthenticated]);

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
            console.log('Fetched items:', response.data);
            setPurchasedItems(response.data);
        } catch (error) {
            console.error('Error fetching purchased items:', error);
        } finally {
            setLoading(false); // Завершение загрузки
        }
    };


    return (
        <div className="purchased-items-container">
            <h1>Items</h1>
            <ul className="purchased-items-list">
                {purchasedItems.length === 0 ? (
                    <li>No items purchased yet</li>
                ) : (
                    purchasedItems.map(item => (
                        <li key={item.id} className="purchased-item">
                            <h2>{item.item_name}</h2>
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
};

export default PurchasedItems;
