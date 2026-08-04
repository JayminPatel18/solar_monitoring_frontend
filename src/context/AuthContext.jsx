import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [auth, setAuth] = useState({
        token: localStorage.getItem("token"),
        role: localStorage.getItem("role"),
        name: localStorage.getItem("name"),
        userId: localStorage.getItem("userId")
    });

    const loginUser = (authData) => {

        localStorage.setItem("token", authData.token);
        localStorage.setItem("role", authData.role);
        localStorage.setItem("name", authData.name);
        localStorage.setItem("userId", authData.userId);

        setAuth(authData);
    };

    const logoutUser = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("name");
        localStorage.removeItem("userId");

        setAuth({
            token: null,
            role: null,
            name: null,
            userId: null
        });
    };

    return (
        <AuthContext.Provider
            value={{
                auth,
                loginUser,
                logoutUser
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};