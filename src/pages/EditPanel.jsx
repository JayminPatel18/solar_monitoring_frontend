import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../api/axiosConfig";
import Navbar from "../components/Navbar";

function EditPanel() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [users, setUsers] = useState([]);

    const [formData, setFormData] = useState({
        panelName: "",
        location: "",
        capacity: "",
        status: "ACTIVE",
        userId: ""
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        fetchPanel();
        fetchUsers();
    }, []);

    const fetchUsers = async () => {

        try {

            const response = await axios.get("/api/users");

            setUsers(response.data);

        } catch (err) {

            console.error(err);
        }
    };

    const fetchPanel = async () => {

        try {

            const response = await axios.get("/api/panels");

            const panel = response.data.find(
                p => p.id === Number(id)
            );

            if (!panel) {
                setError("Panel not found");
                return;
            }

            setFormData({
                panelName: panel.panelName,
                location: panel.location,
                capacity: panel.capacity,
                status: panel.status,
                userId: panel.user?.id || ""
            });

        } catch (err) {

            console.error(err);
            setError("Failed to load panel");
        }
    };

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

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

            await axios.put(
                `/api/panels/update/${id}`,
                payload
            );

            setSuccess("Panel updated successfully");
            setError("");

            setTimeout(() => {
                navigate("/panels");
            }, 1500);

        } catch (err) {

            console.error(err);

            setError("Failed to update panel");
            setSuccess("");
        }
    };

    return (
        <>
            <Navbar />

            <div className="container mt-4">

                <div className="card shadow-lg border-0">

                    <div className="card-header bg-warning">
                        Edit Solar Panel
                    </div>

                    <div className="card-body p-4">

                        {success && (
                            <div className="alert alert-success">
                                {success}
                            </div>
                        )}

                        {error && (
                            <div className="alert alert-danger">
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

                                    {users.map(user => (
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
                                type="submit"
                                className="btn btn-warning"
                            >
                                Update Panel
                            </button>

                        </form>

                    </div>

                </div>

            </div>
        </>
    );
}

export default EditPanel;