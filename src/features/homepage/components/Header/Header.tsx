import "./Header.css";

import { useContext, useMemo } from "react";

import AuthContext from "../../../../lib/authentication/AuthContext";
import Button from "../../../../lib/components/buttons/Button";
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
                        <Button onClick={logout} label="Logout" />
                    </>
                ) : (
                    <>
                        <span className="header-user">GUEST</span>
                        <Button onClick={login} label="Login" />
                    </>
                )}
            </div>
        </header>
    );
}
