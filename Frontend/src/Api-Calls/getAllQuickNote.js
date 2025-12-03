import axios from "axios"

const API = import.meta.env.VITE_API_URL;
export const getAllQuickNote = async (tag, page = 1, limit = 10) => {
    try {
        const res = await axios.get(
            `${API}/api/quicknote/all`,
            {
                params: { tag, page, limit },
                withCredentials: true
            }
        );

        return {
            status: true,
            data: res.data
        };

    } catch (error) {
        return {
            status: false,
            data: error?.response?.data?.message || "Something went wrong"
        };
    }
}
