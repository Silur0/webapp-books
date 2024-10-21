import { useContext, useState } from "react";

import AuthContext from "../../lib/authentication/AuthContext";
import axios from "axios";

export default function LoginPage() {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const authContext = useContext(AuthContext);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            // Replace with your authentication endpoint
            const response = await axios.post("/api/login", {
                username,
                password,
            });
            const token: string = response.data.token;

            // Store the token using the context function
            if (authContext) {
                authContext.login(token);
            }
        } catch (error) {
            console.error("Login failed", error);
        }
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
        </form>
    );
}
