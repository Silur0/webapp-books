import "../src/lib/styles/colors.css";
import "../src/lib/styles/main.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import { AuthProvider } from "./lib/authentication/AuthContext";
import CreateBookPage from "./features/books/pages/CreateBookPage";
import Homepage from "./features/homepage/Homepage";
import LoginPage from "./features/login/LoginPage";
import ProtectedRoute from "./lib/authentication/ProtectedRoute";
import UpdateBookPage from "./features/books/pages/UpdateBookPage";

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Homepage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route
                        path="books/create"
                        element={
                            <ProtectedRoute>
                                <CreateBookPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/books/update/:id"
                        element={
                            <ProtectedRoute>
                                <UpdateBookPage />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
