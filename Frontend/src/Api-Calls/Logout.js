import axios from "axios";

export const Logout = async () => {
    try {
        const res = await axios.get("http://localhost:4000/api/auth/logout", { withCredentials: true });
        if (res.status === 200) return true
    } catch (error) {
        return false
    }
};