// import { createContext, useContext, useState, useEffect } from 'react';

import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                setIsLoggedIn(true);
                // Try to parse user data from token if available
                try {
                    const userData = JSON.parse(localStorage.getItem('userData'));
                    if (userData) {
                        setUser(userData);
                    }
                } catch (e) {
                    console.warn('Failed to parse user data from localStorage:', e);
                }
            }
        } catch (e) {
            console.error('Error accessing localStorage:', e);
        } finally {
            setIsInitialized(true);
        }
    }, []);

    const login = (token, userData) => {
        try {
            localStorage.setItem('token', token);
            if (userData) {
                localStorage.setItem('userData', JSON.stringify(userData));
            }
            setIsLoggedIn(true);
            setUser(userData);
        } catch (e) {
            console.error('Error saving auth data:', e);
            throw new Error('Failed to complete login');
        }
    };

    const logout = () => {
        try {
            localStorage.removeItem('token');
            localStorage.removeItem('userData');
            setIsLoggedIn(false);
            setUser(null);
        } catch (e) {
            console.error('Error during logout:', e);
        }
    };

    // Don't render children until auth is initialized
    if (!isInitialized) {
        return null;
    }

    return (
        <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}; 