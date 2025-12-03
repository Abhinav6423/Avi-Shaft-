import axios from "axios";

const API = import.meta.env.VITE_API_URL;
export const Logout = async () => {
    try {
        const res = await axios.get(`${API}/api/auth/logout`, { withCredentials: true });
        if (res.status === 200) return true
    } catch (error) {
        return false
    }
};