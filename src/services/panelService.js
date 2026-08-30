import axios from "../api/axiosConfig";

// Get all panels
export const getPanels = () => {
    return axios.get("/api/panels");
};

// Get panel by ID
export const getPanelById = (id) => {
    return axios.get(`/api/panels/${id}`);
};

// Create panel
export const createPanel = (panel) => {
    return axios.post("/api/panels", panel);
};

// Update panel
export const updatePanel = (id, panel) => {
    return axios.put(`/api/panels/${id}`, panel);
};

// Delete panel
export const deletePanel = (id) => {
    return axios.delete(`/api/panels/${id}`);
};