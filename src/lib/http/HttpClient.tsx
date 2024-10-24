import axios from "axios";

const HttpClient = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
});

HttpClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("authToken");

    if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
});

export default HttpClient;
