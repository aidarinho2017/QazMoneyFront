import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../styles/Chat.css";

const ChatComponent = () => {
    const [chats, setChats] = useState([]);
    const [inputText, setInputText] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchChats();
    }, []);

    const fetchChats = async () => {
        try {
            const response = await axios.get('/api/get_chats/');
            setChats(response.data.chats || []);
        } catch (error) {
            console.error("Error fetching chats:", error);
        }
    };

    const handleAskQuestion = async () => {
        setLoading(true);
        try {
            const response = await axios.post('/api/ask_question/', { text: inputText });
            setChats([...chats, { text_input: inputText, gemini_output: response.data.data.text, date: new Date().toISOString() }]);
            setInputText("");
        } catch (error) {
            console.error("Error asking question:", error);
        }
        setLoading(false);
    };

    return (
        <div className="chat-container">
            <div className="chat-input-container">
                <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Ask a question"
                />
                <button onClick={handleAskQuestion} disabled={loading}>
                    {loading ? "Asking..." : "Ask"}
                </button>
            </div>
            <div className="chat-messages">
                {chats.length > 0 ? (
                    chats.map((chat, index) => (
                        <div key={index} className="chat-message">
                            <strong>Q:</strong> {chat.text_input}
                            <strong>A:</strong> {chat.gemini_output}
                            <em>{new Date(chat.date).toLocaleString()}</em>
                        </div>
                    ))
                ) : (
                    <p>No chats yet</p>
                )}
            </div>
        </div>
    );
};

export default ChatComponent;
