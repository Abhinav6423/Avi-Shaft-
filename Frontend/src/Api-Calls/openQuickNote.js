import axios from "axios";

export const openNote = async (noteId) => {
    try {
        const res = await axios.get(
            `http://localhost:4000/api/quicknote/singleNote/${noteId}`,
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
