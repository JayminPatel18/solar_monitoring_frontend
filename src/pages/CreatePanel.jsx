import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axiosConfig";
import Navbar from "../components/Navbar";

function CreatePanel() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        panelName: "",
        location: "",
        capacity: "",
        status: "ACTIVE",
        userId: ""
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const [users, setUsers] = useState([]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const fetchUsers = async () => {

        try {

            const response = await axios.get("/api/users");

            setUsers(response.data);

        } catch (err) {

            console.error("Failed to load users", err);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const validateForm = () => {

        if (!formData.panelName.trim()) {
            setError("Panel Name is required");
            return false;
        }

        if (!formData.location.trim()) {
            setError("Location is required");
            return false;
        }

        if (Number(formData.capacity) <= 0) {
            setError("Capacity must be greater than 0");
            return false;
        }

        if (!formData.userId) {
            setError("Please select a user");
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");
        setSuccess("");

        if (!validateForm()) {
            return;
        }

        try {

            const payload = {
                panelName: formData.panelName,
                location: formData.location,
                capacity: Number(formData.capacity),
                status: formData.status,
                user: {
                    id: Number(formData.userId)
                }
            };

            await axios.post("/api/panels", payload);

            setSuccess("Panel created successfully!");
            setError("");

            setTimeout(() => {
                navigate("/panels");
            }, 1500);

        } catch (err) {

            console.error(err);

            setError("Failed to create panel");
            setSuccess("");
        }
    };

    return (
        <>
            <Navbar />

            <div className="container mt-4">

                <div className="card shadow-lg border-0">

                    <div className="card-header bg-primary text-white">
                        Create Solar Panel
                    </div>

                    <div className="card-body p-4">

                        {success && (
                            <div className="alert alert-success alert-dismissible fade show">
                                {success}
                            </div>
                        )}

                        {error && (
                            <div className="alert alert-danger alert-dismissible fade show">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit}>

                            <div className="mb-3">
                                <label className="form-label">
                                    Panel Name
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    name="panelName"
                                    value={formData.panelName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">
                                    Location
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">
                                    Capacity
                                </label>

                                <input
                                    type="number"
                                    className="form-control"
                                    name="capacity"
                                    value={formData.capacity}
                                    onChange={handleChange}
                                    min="0.1"
                                    step="0.1"
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">
                                    Status
                                </label>

                                <select
                                    className="form-select"
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                >
                                    <option value="ACTIVE">
                                        ACTIVE
                                    </option>

                                    <option value="FAULT">
                                        FAULT
                                    </option>

                                    <option value="OVERHEATED">
                                        OVERHEATED
                                    </option>
                                </select>
                            </div>

                            <div className="mb-3">
                                <label className="form-label">
                                    User
                                </label>

                                <select
                                    className="form-select"
                                    name="userId"
                                    value={formData.userId}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">
                                        Select User
                                    </option>

                                    {users.map((user) => (
                                        <option
                                            key={user.id}
                                            value={user.id}
                                        >
                                            {user.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <button
                                className="btn btn-success"
                                type="submit"
                            >
                                Create Panel
                            </button>

                        </form>

                    </div>

                </div>

            </div>
        </>
    );
}

export default CreatePanel;