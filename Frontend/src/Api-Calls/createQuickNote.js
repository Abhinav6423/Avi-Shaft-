import axios from "axios"

export const createQuickNote = async ( title, note, tag ) => {
    try {
        const res = await axios.post("http://localhost:4000/api/quicknote/create",
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