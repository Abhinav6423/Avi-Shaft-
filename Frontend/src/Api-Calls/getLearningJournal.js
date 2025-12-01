import axios from "axios";

export const getLearningJournal = async (tag, page, limit) => {
    try {
        const res = await axios.get(
            `http://localhost:4000/api/learningjournal/all`,
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