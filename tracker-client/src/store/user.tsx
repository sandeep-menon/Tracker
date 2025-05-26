import { create } from "zustand";
import { persist } from "zustand/middleware";

type UserState = {
    isLoggedIn: boolean;
    setIsLoggedIn: (isLoggedIn: boolean) => void;
    token: string;
    setToken: (token: string) => void;
    userData: UserData;
    setUserData: (userData: UserData) => void;
}

type UserData = {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
}

export const useUserStore = create<UserState>()(
    persist(
        (set) => ({
            isLoggedIn: false,
            setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),
            token: "",
            setToken: (token) => set({ token }),
            userData: {
                firstName: "",
                lastName: "",
                email: "",
                _id: ""
            },
            setUserData: (userData) => set({ userData })
        }),
        {
            name: "user-store", // key in localStorage
        }
    )
);