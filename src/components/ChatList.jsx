// ChatList.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import NavBar from "../components/NavBar";
import "../styles/Chat.css";

const ChatList = () => {
    const [chatRooms, setChatRooms] = useState([]);

    useEffect(() => {
        const fetchChatRooms = async () => {
            try {
                const response = await api.get('/api/chat_rooms/');
                setChatRooms(response.data);
            } catch (error) {
                console.error('Failed to fetch chat rooms:', error);
            }
        };

        fetchChatRooms();
    }, []);

    return (
        <div>
            <NavBar/>
            <div>
                <h1>Chat Rooms</h1>
                <ul>
                    {chatRooms.map((chatRoom) => (
                        <li key={chatRoom.id}> ChatRoom {chatRoom.id} {chatRoom.title}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ChatList;
