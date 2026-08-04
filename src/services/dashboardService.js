import api from "../api/axiosConfig";

export const getDashboardSummary = async () => {

    const response = await api.get(
        "/api/dashboard/summary"
    );

    return response.data;
};