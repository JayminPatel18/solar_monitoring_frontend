import axios from "axios"

const api = axios.create({
    baseURL: "http://localhost:8080",
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    const publicUrls = [
        "/api/auth/login",
        "/api/auth/register"
    ];

    if (
        token &&
        !publicUrls.includes(config.url)
    ) {
        config.headers.Authorization =
            `Bearer ${token}`;
    }

    return config;
})

export default api;