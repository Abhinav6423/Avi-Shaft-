import axios from "axios";
const API = import.meta.env.VITE_API_URL;
export const openNote = async (noteId) => {
    try {
        const res = await axios.get(
            `${API}/api/quicknote/singleNote/${noteId}`,
            { withCredentials: true }
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
};
