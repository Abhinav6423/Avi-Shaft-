import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export const RegisterUser = async ({ username, email, password, profilePic }) => {
    try {
        const res = await axios.post(`${API}/api/auth/register`, { username, email, password, profilePic }, { withCredentials: true });
        if (res.status === 201) {
            console.log(res?.data)
            return res?.data
        }
    } catch (error) {
        console.log(error);
        return error
    }
}



