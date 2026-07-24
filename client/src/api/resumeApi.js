import axios from "axios";

const API = "http://localhost:5000/api/resume";

export const uploadResume = async (formData, token) => {

    return axios.post(
        `${API}/upload`,
        formData,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            },
        }
    );

};