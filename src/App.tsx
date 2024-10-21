import "../src/lib/styles/colors.css";
import "../src/lib/styles/main.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import { AuthProvider } from "./lib/authentication/AuthContext";
import Homepage from "./features/homepage/Homepage";
import LoginPage from "./features/login/LoginPage";

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Homepage />} />
                    <Route path="login" element={<LoginPage />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
