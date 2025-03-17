"use client"
import { useState, createContext, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    // Check if user is logged in
    useEffect(() => {
        const token = Cookies.get("access");
        if (token) checkUser();
    }, []);

    // Fetch user details from API
    const checkUser = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_ENDPOINT}/user/getUser/`, {
                headers: { Authorization: `Bearer ${Cookies.get("access")}` },
            });
            setUser(response.data);
        } catch (error) {
            console.error("Failed to fetch user", error);
            logout();
        }
    };

    // Signup Function
    const signup = async (email, password, userRole) => {
        setLoading(true);
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API_ENDPOINT}/auth/register/`, {
                email,
                password,
                role: userRole,
                channel: "email",
            });

            const { access, refresh, role } = response.data;

            localStorage.setItem("accessToken", access);
            localStorage.setItem("refreshToken", refresh);
            localStorage.setItem("userRole", role);  // Store role

            setUser({ role });

            // Redirect user based on role
            if (role === "PUBLISHER") {
                router.push("/dashboard/publisher");
            } else if (role === "ADVERTISER") {
                router.push("/dashboard/advertiser");
            } else {
                router.push("/dashboard");
            }
        } catch (error) {
            console.error("Signup failed:", error.response?.data.message);
            throw error; 
        } finally {
            setLoading(false);
        }
    };

    // Login Function
    const login = async (email, password) => {
        setLoading(true);
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API_ENDPOINT}/auth/email/`, { email, password });
            const { access, refresh, role } = response.data;

            localStorage.setItem("accessToken", access);
            localStorage.setItem("refreshToken", refresh);
            localStorage.setItem("userRole", role);  // Store role

            setUser({ role });

            // Redirect user based on role
            if (role === "PUBLISHER") {
                router.push("/dashboard/publisher");
            } else if (role === "ADVERTISER") {
                router.push("/dashboard/advertiser");
            } else {
                router.push("/dashboard");
            }
        } catch (error) {
            console.error("Login error:", error.response?.data);
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("userRole");
        setUser(null);
        router.push("/login");
    };

    useEffect(() => {
        const role = localStorage.getItem("userRole");
        if (role) {
            setUser({ role });
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, signup, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};