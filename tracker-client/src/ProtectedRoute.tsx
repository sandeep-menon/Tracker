import { ReactNode } from "react";
import { useAuth } from "./AuthContext";
import { Navigate, useLocation } from "react-router-dom";

export const ProtectedRoute = ({children} : {children: ReactNode}) => {
    const {isLoggedIn} = useAuth();
    const location = useLocation();

    if (!isLoggedIn) {
        return <Navigate to="/login" state={{from : location}} replace />;
    }

    return (
        <>{children}</>
    )
}