import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            console.log('Found token in storage, validating...');
            // Validate token by making a request to get user data
            fetch('https://shatably.runasp.net/api/clients/me', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                console.log('Token validation response:', response.status);
                if (!response.ok) {
                    throw new Error('Token invalid');
                }
                return response.json();
            })
            .then(userData => {
                console.log('Token validation successful, user data received');
                setIsLoggedIn(true);
                setUser(userData);
            })
            .catch(error => {
                console.error('Token validation failed:', error);
                localStorage.removeItem('token');
                setIsLoggedIn(false);
                setUser(null);
            });
        } else {
            console.log('No token found in storage');
        }
    }, []);

    const login = (token, userData) => {
        console.log('Logging in with token:', token ? `${token.slice(0, 10)}...` : 'no token');
        localStorage.setItem('token', token);
        setIsLoggedIn(true);
        setUser(userData);
    };

    const logout = () => {
        console.log('Logging out, removing token');
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}; 