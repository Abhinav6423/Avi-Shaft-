import axios from "axios"
const API = import.meta.env.VITE_API_URL;
export const getUserStats = async () => {
    try {
        const res = await axios.get(`${API}/api/auth/userStats`, { withCredentials: true });
        if (res.status === 200) return {
            status: true,
            data: res?.data?.data
        }
    } catch (error) {
        return {
            status: false,
            data: error?.response?.data?.message
        }
    }
}