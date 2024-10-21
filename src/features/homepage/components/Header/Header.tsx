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
        <header className="header">
            <div className="header-title">
                sword <br />
                Book Collection
            </div>
            <div className="header-menu">
                {isAuth ? (
                    <>
                        <span className="header-user logged">
                            {authContext?.data.username
                                ?.toUpperCase()
                                .substring(0, 15)}
                        </span>
                        <button className="button" onClick={logout}>
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <span className="header-user">GUEST</span>
                        <button className="button" onClick={login}>
                            Login
                        </button>
                    </>
                )}
            </div>
        </header>
    );
}
