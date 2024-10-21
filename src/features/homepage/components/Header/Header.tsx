import "./Header.css";

import { useContext, useMemo, useState } from "react";

import AuthContext from "../../../../lib/authentication/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Header() {
    const navigate = useNavigate();
    const authContext = useContext(AuthContext);

    const isAuth = useMemo(() => {
        return authContext?.authToken != null;
    }, [authContext?.authToken]);

    const login = () => {
        navigate("/login");
    };

    const logout = () => {
        authContext?.logout();
    };

    return (
        <header>
            <div>Titulo</div>
            <div>
                <span>
                    {isAuth
                        ? authContext?.data.username?.toUpperCase()
                        : "GUEST"}
                </span>
                {isAuth ? (
                    <button onClick={logout}>Logout</button>
                ) : (
                    <button onClick={login}>Login</button>
                )}
            </div>
        </header>
    );
}
