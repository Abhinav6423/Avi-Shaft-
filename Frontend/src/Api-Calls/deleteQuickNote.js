import axios from "axios"

export const deleteQuickNote = async ({ noteId }) => {
    try {
        const res = await axios.post("http://localhost:4000/api/quicknote/delete/:noteId", { withCredentials: true });
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