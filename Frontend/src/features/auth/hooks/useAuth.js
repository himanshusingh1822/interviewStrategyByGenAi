import { useContext } from "react";
import { AuthContext } from "../Auth.context";
import { register, login, logout, get_Me } from "../services/auth.api";

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }

    const { user, setUser, loading, setLoading, authError, setAuthError } = context;

    const handleRegister = async ({ username, email, password }) => {
        try {
            setLoading(true);
            setAuthError(null); 
            const data = await register({ username, email, password });
            setUser(data.user);
            setLoading(false);
            return data.user; 
        } catch (err) {
            const errorMsg = err.response?.data?.message || err.message;
            setAuthError(errorMsg);
            setLoading(false); 
        }
    };

    const handleLogin = async ({ email, password }) => {
        try {
            setLoading(true);
            setAuthError(null); 
            const data = await login({ email, password });
            setUser(data.user);
            setLoading(false);
            return data.user; /* FIX 2: Return data to component */
        } catch (err) {
            const errorMsg = err.response?.data?.message || err.message;
            setAuthError(errorMsg);
            setLoading(false); /* FIX 3: Reset loading state on failure */
        }
    };

    const handleLogout = async () => {
        try {
            setLoading(true);
            await logout();
            setUser(null);
            setLoading(false);
        } catch (err) {
            const errorMsg = err.response?.data?.message || err.message;
            setAuthError(errorMsg);
            setLoading(false);
        }
    };

    const handleGetMe = async () => {
        try {
            setLoading(true);
            const data = await get_Me();
            setUser(data.user);
            setLoading(false);
            return data.user;
        } catch (err) {
            const errorMsg = err.response?.data?.message || err.message;
            setAuthError(errorMsg);
            setLoading(false);
        }
    };

    return { user, loading, authError, handleRegister, handleLogin, handleLogout, handleGetMe };
};
