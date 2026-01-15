import React, { createContext, useState, useEffect, useContext } from 'react';
import type { ReactNode } from 'react';
import { login as authLogin, logout as authLogout, getCurrentUser } from '../services/auth.service';
import type { User } from '../services/auth.service';

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    login: (email: string, pass: string) => Promise<void>;
    logout: () => void;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const user = getCurrentUser();
        if (user) {
            setUser(user);
        }
        setIsLoading(false);
    }, []);

    const login = async (email: string, pass: string) => {
        const data = await authLogin(email, pass);
        setUser(data.user);
    };

    const logout = () => {
        authLogout();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, isLoading }}>
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
