import axios from "axios"
const API = import.meta.env.VITE_API_URL;


export const createQuickNote = async ( title, note, tag ) => {
    try {
        const res = await axios.post(`${API}/api/quicknote/create`,
            { title, note, tag },
            { withCredentials: true });

        if (res.status === 201) return {
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