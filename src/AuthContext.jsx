import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(true);

    useEffect(() => {
        // Check localStorage or any other method to determine if user is authenticated
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
        }
    }, []);
    const login = (token) => {
        localStorage.setItem('token', token);
        setIsAuthenticated(true);
    };

    const logout = () => {
        localStorage.clear();
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
