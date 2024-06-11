import React, { useEffect, useState, useContext } from 'react';
import api from '../api';
import { ACCESS_TOKEN } from '../constants';
import '../styles/Shop.css';
import AuthContext from '../AuthContext';

const Shop = () => {
    const [items, setItems] = useState([]);
    const { coins, setCoins } = useContext(AuthContext);

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        try {
            const token = localStorage.getItem(ACCESS_TOKEN);
            if (!token) {
                console.error('No access token found');
                return;
            }
            const response = await api.get('/api/items/', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setItems(response.data);
        } catch (error) {
            console.error('Error fetching items:', error);
        }
    };

    const handlePurchase = async (itemId, price) => {
        if (coins < price) {
            alert('Not enough coins!');
            return;
        }

        try {
            const token = localStorage.getItem(ACCESS_TOKEN);
            if (!token) {
                console.error('No access token found');
                return;
            }
            await api.post(`/api/items/${itemId}/purchase/`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setCoins(coins - price);
            alert('Purchase successful!');
        } catch (error) {
            console.error('Error making purchase:', error);
        }
    };

    return (
        <div className="shop-container">
            <h1>Shop</h1>
            <ul className="shop-list">
                {items.length === 0 ? (
                    <li className="shop-item">No items available</li>
                ) : (
                    items.map(item => (
                        <li key={item.id} className="shop-item">
                            <h2>{item.name}</h2>
                            <p>{item.money_per_hour}💸 per hour</p>
                            <button onClick={() => handlePurchase(item.id, item.price)}>Buy</button>
                            <p>Price: {item.price} 💵</p>
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
};

export default Shop;
