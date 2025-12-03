import axios from "axios";

const API = import.meta.env.VITE_API_URL;
export const getMeData = async () => {
    try {
        const res = await axios.get(
            `${API}/api/auth/me`,
            { withCredentials: true }
        );

        return res?.data?.user; // return user object
    } catch (error) {
        return null; // Not logged in or token invalid
    }
};
