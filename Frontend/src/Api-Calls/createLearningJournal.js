import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export const createLearningJournal = async (
    title,
    content,
    selectedTag,
    difficulty,
    effort
) => {

    // Debug print to ensure API URL is loaded
    console.log("📡 Backend URL:", API);

    if (!API) {
        console.error("❌ ERROR: VITE_API_URL is missing in .env");
        return {
            status: false,
            data: "Backend URL is not configured"
        };
    }

    try {
        // Payload log
        const payload = {
            title,
            note: content,
            tag: selectedTag,
            difficulty: Number(difficulty),
            timeRate: Number(effort)
        };

        console.log("📤 Sending payload:", payload);

        const res = await axios.post(
            `${API}/api/learningjournal/create`,
            payload,
            {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );

        console.log("✅ Backend response:", res.data);

        return {
            status: true,
            data: res.data
        };

    } catch (error) {
        console.error("❌ API ERROR:", error);

        return {
            status: false,
            data: error?.response?.data?.message || "Request failed"
        };
    }
};
