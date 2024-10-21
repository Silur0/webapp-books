import React, { ReactNode, createContext, useEffect, useState } from "react";

interface AuthContextType {
    authToken: string | null;
    login: (token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider(props: AuthProviderProps) {
    const [authToken, setAuthToken] = useState<string | null>(() => {
        return localStorage.getItem("authToken") || null;
    });

    const login = (token: string) => {
        setAuthToken(token);
        localStorage.setItem("authToken", token);
    };

    const logout = () => {
        setAuthToken(null);
        localStorage.removeItem("authToken");
    };

    return (
        <AuthContext.Provider value={{ authToken, login, logout }}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
