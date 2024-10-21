import { ReactNode, createContext, useMemo, useState } from "react";

import { jwtDecode } from "jwt-decode";

interface TokenData {
    userId: string | null;
    username: string | null;
}

interface AuthContextType {
    authToken: string | null;
    data: TokenData;
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

    const data = useMemo(() => {
        return authToken
            ? getDataFromToken(authToken)
            : { userId: "", username: "" };
    }, [authToken]);

    function getDataFromToken(token: string) {
        return jwtDecode(token) as { userId: string; username: string };
    }

    const login = (token: string) => {
        setAuthToken(token);
        localStorage.setItem("authToken", token);
    };

    const logout = () => {
        setAuthToken(null);
        localStorage.removeItem("authToken");
    };

    return (
        <AuthContext.Provider value={{ authToken, data, login, logout }}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
