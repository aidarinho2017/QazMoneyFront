// Chat.jsx
import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';
import NavBar from "../components/NavBar";
import AuthContext from '../AuthContext';
import "../styles/Chat.css";

const Chat = () => {
    const { jobId } = useParams();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await api.get(`/api/chat_rooms/${jobId}/messages/`);
                setMessages(response.data);
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        };
        fetchMessages();
    }, [jobId]);

    const handleSendMessage = async () => {
        if (!user) {
            console.error('User not logged in');
            return;
        }
        try {
            await api.post(`/api/chat_rooms/${jobId}/messages/`, { content: newMessage });
            setNewMessage('');
            const response = await api.get(`/api/chat_rooms/${jobId}/messages/`);
            setMessages(response.data);
        } catch (error) {
            console.error('Error sending message:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <div>
            <NavBar />
            <div className="chat-container">
                <div className="messages">
                    {messages.map(message => (
                        <div key={message.id} className="message">
                            <span>{message.sender.username}: </span>{message.content}
                        </div>
                    ))}
                </div>
                <input
                    type="text"
                    value={newMessage}
                    onChange={e => setNewMessage(e.target.value)}
                    placeholder="Type a message"
                />
                <button onClick={handleSendMessage}>Send</button>
            </div>
        </div>
    );
};

export default Chat;
