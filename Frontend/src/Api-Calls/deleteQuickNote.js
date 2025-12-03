import axios from "axios"

const API = import.meta.env.VITE_API_URL;

export const deleteQuickNote = async ({ noteId }) => {
    try {h
        const res = await axios.post(`${API}/api/quicknote/delete/:noteId`, { withCredentials: true });
        if (res.status === 200) return {
            status: true,
            data: res?.data
        }
    } catch (error) {
        return {
            status: false,
            data: error?.response?.data?.message
        }
    }
}