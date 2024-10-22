import { ReactNode, useContext } from "react";

import AuthContext from "./AuthContext";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({
    children,
}: {
    children: ReactNode | undefined;
}) {
    const authContext = useContext(AuthContext);

    if (!authContext?.authToken) {
        return <Navigate to="/login" />;
    }
    return <>{children}</>;
}
