import axios from "axios";

const API = import.meta.env.VITE_API_URL;


export const createLearningJournal = async (title, content, selectedTag, difficulty, effort) => {
    try {
        const res = await axios.post(`${API}/api/learningjournal/create`,
            { title, note: content, tag: selectedTag, difficulty, timeRate: effort },
            { withCredentials: true });

        if (res.status === 200) {
            console.log(res?.data)
            return {

                status: true,
                data: res?.data
            }

        }

    } catch (error) {
        console.log(error?.response?.data?.message);
        return {
            status: false,
            data: error?.response?.data?.message
        }
    }
}