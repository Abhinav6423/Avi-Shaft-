import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export const openLearningJournal = async (journalId) => {
    try {
        const res = await axios.get(
            `${API}/api/learningjournal/openjournal/${journalId}`,
            { withCredentials: true }
        );

        // Backend success validation
        if (res.data.success === true) {
            return {
                status: true,
                data: res.data.data  // <-- THIS is the actual journal object
            };
        }

        return {
            status: false,
            data: res.data.message
        };

    } catch (error) {
        return {
            status: false,
            data: error?.response?.data?.message || "Something went wrong"
        };
    }
};
