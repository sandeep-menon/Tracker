import { useNavigate } from "react-router-dom";
import { createContext, ReactNode, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { toast } from "./hooks/use-toast";
import axios from "axios";
import { useUserStore } from "./store/user";
import React from "react";

interface AuthContextType {
    isLoggedIn: boolean;
    token: string | null;
    setToken: (token: string ) => void;
    setIsLoggedIn: (value: boolean) => void;
    logout: () => void;
    getUserData: () => Promise<UserData>;
    userData: UserData;
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

const api = import.meta.env.VITE_API_BASE_URL;

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const isLoggedIn = useUserStore((state) => state.isLoggedIn);
    const setIsLoggedIn = useUserStore((state) => state.setIsLoggedIn);
    const token = useUserStore((state) => state.token);
    const setToken = useUserStore((state) => state.setToken);
    const userData = useUserStore((state) => state.userData);
    const setUserData = useUserStore((state) => state.setUserData);
    const navigate = useNavigate();
    const emptyUserData = {
        id: "",
        firstName: "",
        lastName: "",
        email: ""
    }

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

    const handleSetToken = (newToken: string) => {
        setToken(newToken);
        setIsLoggedIn(!!newToken && !isTokenExpired(newToken));
        if (newToken) {
            // localStorage.setItem("token", newToken);
            // localStorage.setItem("isLoggedIn", "true");
            getUserData(newToken).catch(() => {});
        } else {
            // localStorage.removeItem("token");
            // localStorage.removeItem("isLoggedIn");
            // localStorage.removeItem("userData");
            setUserData(emptyUserData);
        }
    };

    const logout = (expired = false) => {
        setIsLoggedIn(false);
        handleSetToken("");
        if (typeof (expired) === 'boolean' && expired) {
            toast({
                title: "Session expired",
                description: "Your session has expired. Please log in again.",
                variant: "destructive",
            })
        }
        navigate("/login");
    }

    const getUserData = async (token: string): Promise<UserData> => {
        if (!token) throw new Error("No token available");

        try {
            // First try to decode the JWT to get the user ID
            const decoded = jwtDecode<JWTPayload>(token);
            
            // Make API call to get user data
            const response = await axios.get(`${api}/api/user`, {
                headers: {
                    'x-auth-token': token
                },
                params: {
                    id: decoded.id
                }
            });

            const userData: UserData = response.data;
            setUserData(userData);
            // localStorage.setItem("userData", JSON.stringify(userData));
            return userData;
        } catch (err) {
            console.error("Error fetching user data:", err);
            if (axios.isAxiosError(err) && err.response?.status === 401) {
                logout(true);
            }
            throw err;
        }
    }

    useEffect(() => {
        if (token && isTokenExpired(token)) {
            logout(true);
        } else if (token && !userData) {
            getUserData(token).catch(() => {});
        }
    }, [token]);

    return (
        <AuthContext.Provider value={{
            isLoggedIn,
            token,
            setToken: handleSetToken,
            setIsLoggedIn,
            logout,
            getUserData: () => getUserData(token),
            userData
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const ctx = React.useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within AuthProvider");
    return ctx;
}