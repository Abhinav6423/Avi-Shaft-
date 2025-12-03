import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export const getLearningJournal = async (tag, page, limit) => {
    try {
        const res = await axios.get(
            `${API}/api/learningjournal/all`,
            {
                params: { tag, page, limit },
                withCredentials: true
            }


        );
           console.log(tag)
        return {
            status: true,
            data: res?.data
        }

    } catch (error) {
        return {
            status: false,
            data: error?.response?.data?.message || "Something went wrong"
        }
    }
};