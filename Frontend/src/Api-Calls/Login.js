import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export const LoginUser = async ({ email, password }) => {
    try {
        const res = await axios.post(`${API}/api/auth/login`, { email, password }, { withCredentials: true });

        if (res.status === 200) {
            return {
                status: true,
                data: res?.data
            }
        }
    } catch (error) {
        return {
            status: false,
            data: error?.response?.data?.message

        }
    }
}