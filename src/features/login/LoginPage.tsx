import "./LoginPage.css";

import { useContext, useState } from "react";

import AuthContext from "../../lib/authentication/AuthContext";
import AuthService from "../../lib/authentication/AuthService";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { useServiceCall } from "../../lib/utils/ServiceCall";

export default function LoginPage() {
    const navigate = useNavigate();
    const authContext = useContext(AuthContext);

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState("");

    const loginService = useServiceCall(AuthService.Login);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        await loginService
            .invoke(username, password)
            .then((data) => {
                const token: string = data.token;

                if (authContext) {
                    authContext.login(token);
                    navigate("/");
                }
            })
            .catch((error) => {
                if (error instanceof AxiosError) {
                    setError(error.response?.data.message);
                    console.error("Login failed", error);
                }
            });
    };
    return (
        <form onSubmit={handleLogin}>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            <button type="submit">Login</button>
            <div>{error}</div>
        </form>
    );
}
