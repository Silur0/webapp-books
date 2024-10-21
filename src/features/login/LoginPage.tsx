import { useContext, useState } from "react";

import AuthContext from "../../lib/authentication/AuthContext";
import AuthService from "../../lib/authentication/AuthService";
import { useServiceCall } from "../../lib/utils/ServiceCall";

export default function LoginPage() {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const authContext = useContext(AuthContext);

    const loginService = useServiceCall(AuthService.Login);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await loginService.invoke(username, password);
            const token: string = response.token;

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
