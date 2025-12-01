import axios from "axios"

export const getAllQuickNote = async (tag, page = 1, limit = 10) => {
    try {
        const res = await axios.get(
            `http://localhost:4000/api/quicknote/all`,
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
