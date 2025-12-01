import axios from "axios";

export const LoginUser = async ({ email, password }) => {
    try {
        const res = await axios.post("http://localhost:4000/api/auth/login", { email, password }, { withCredentials: true });

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