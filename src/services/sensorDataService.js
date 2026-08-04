import axios from "../api/axiosConfig";

// Get all sensor readings
export const getAllSensorData = () => {
    return axios.get("/api/data");
};

// Save sensor reading
export const createSensorData = (data) => {
    return axios.post("/api/data", data);
};

// Get latest reading
export const getLatestSensorData = (panelId) => {
    return axios.get(`/api/data/latest/${panelId}`);
};

// Get sensor history by panel
export const getSensorDataByPanel = (panelId) => {
    return axios.get(`/api/data/panel/${panelId}`);
};

// Get total power
export const getTotalPower = (panelId) => {
    return axios.get(`/api/data/total/${panelId}`);
};

// Get smart status
export const getPanelStatus = (panelId) => {
    return axios.get(`/api/data/status/${panelId}`);
};