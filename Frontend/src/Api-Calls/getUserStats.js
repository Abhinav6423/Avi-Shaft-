import axios from "axios"

export const getUserStats = async () => {
    try {
        const res = await axios.get("http://localhost:4000/api/auth/userStats", { withCredentials: true });
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