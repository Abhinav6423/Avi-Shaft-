import axios from "axios";

export const RegisterUser = async ({ username, email, password, profilePic }) => {
    try {
        const res = await axios.post("http://localhost:4000/api/auth/register", { username, email, password, profilePic }, { withCredentials: true });
        if (res.status === 201) {
            console.log(res?.data)
            return res?.data
        }
    } catch (error) {
        console.log(error);
        return error
    }
}



