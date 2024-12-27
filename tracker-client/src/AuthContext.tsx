import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { createContext, useContext, ReactNode, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { toast } from "./hooks/use-toast";
import axios from "axios";

interface AuthContextType {
    isLoggedIn: boolean;
    token: string | null;
    setToken: (token: string | null) => void;
    setIsLoggedIn: (value: boolean) => void;
    logout: () => void;
    getUserData: () => Promise<UserData | null>;
    userData: UserData | null;
}

interface JWTPayload {
    id: string;
    exp: number;
    iat: number;
}

interface UserData {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
        localStorage.getItem("isLoggedIn") === "true"
    );
    const [token, setToken] = useState<string | null>(
        localStorage.getItem("token")
    );
    const [userData, setUserData] = useState<UserData | null>(null);
    const navigate = useNavigate();

    const isTokenExpired = (token: string | null): boolean => {
        if (!token) {
            return true;
        }

        try {
            const decodedToken = jwtDecode<JWTPayload>(token);
            const currentTime = Date.now() / 1000;
            return decodedToken.exp < currentTime;
        } catch (err) {
            console.log("Error decoding token: " + err);
            return true;
        }
    }

    const handleSetToken = (newToken: string | null) => {
        setToken(newToken);
        setIsLoggedIn(!!newToken && !isTokenExpired(newToken));
        if (newToken) {
            localStorage.setItem("token", newToken);
            localStorage.setItem("isLoggedIn", "true");
            // Fetch user data when setting new token
            getUserData();
        } else {
            localStorage.removeItem("token");
            localStorage.removeItem("isLoggedIn");
            localStorage.removeItem("userData");
            setUserData(null);
        }
    }

    const logout = (expired = false) => {
        handleSetToken(null);
        if (typeof (expired) === 'boolean' && expired) {
            toast({
                title: "Session expired",
                description: "Your session has expired. Please log in again.",
                variant: "destructive",
            })
        }
        navigate("/login");
    }

    const getUserData = async (): Promise<UserData | null> => {
        if (!token) return null;

        try {
            // First try to decode the JWT to get the user ID
            const decoded = jwtDecode<JWTPayload>(token);
            
            // Make API call to get user data
            const response = await axios.get(`http://localhost:5000/api/user`, {
                headers: {
                    'x-auth-token': token
                },
                params: {
                    id: decoded.id
                }
            });

            const userData: UserData = response.data;
            setUserData(userData);
            localStorage.setItem("userData", JSON.stringify(userData));
            return userData;
        } catch (err) {
            console.error("Error fetching user data:", err);
            if (axios.isAxiosError(err) && err.response?.status === 401) {
                logout(true);
            }
            return null;
        }
    }

    useEffect(() => {
        if (token && isTokenExpired(token)) {
            logout(true);
        } else if (token && !userData) {
            getUserData();
        }
    }, [token]);

    return (
        <AuthContext.Provider value={{
            isLoggedIn,
            token,
            setToken: handleSetToken,
            setIsLoggedIn,
            logout,
            getUserData,
            userData
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}