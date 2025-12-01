import axios from "axios";

export const getMeData = async () => {
    try {
        const res = await axios.get(
            "http://localhost:4000/api/auth/me",
            { withCredentials: true }
        );

        return res?.data?.user; // return user object
    } catch (error) {
        return null; // Not logged in or token invalid
    }
};
