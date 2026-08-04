import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getUserById, updateUser } from "../api/userApi";

function EditUser() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });

    useEffect(() => {
        loadUser();
    }, []);

    const loadUser = async () => {
        try {
            const response = await getUserById(id);

            const user = response.data;

            setFormData({
                name: user.name,
                email: user.email,
                password: ""
            });
        } catch (err) {
            setError(err.response?.data?.message || "Failed to load user.");
        } finally {
            setLoading(false);
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

        setSuccess("");
        setError("");

        if (!formData.name.trim()) {
            setError("Name is required.");
            return;
        }

        const payload = {
            name: formData.name
        };

        if (formData.password.trim() !== "") {
            payload.password = formData.password;
        }

        try {
            setSaving(true);

            await updateUser(id, payload);

            setSuccess("User updated successfully.");

            setTimeout(() => {
                navigate("/users");
            }, 1500);

        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Failed to update user."
            );
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <>
                <Navbar />
                <div className="container mt-4">
                    <div className="text-center">
                        <div className="spinner-border"></div>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <Navbar />

            <div className="container mt-4">

                <div className="card shadow">

                    <div className="card-header bg-primary text-white">
                        <h4>Edit User</h4>
                    </div>

                    <div className="card-body">

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
                                    Name
                                </label>

                                <input
                                    type="text"
                                    name="name"
                                    className="form-control"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">
                                    Email
                                </label>

                                <input
                                    type="email"
                                    className="form-control"
                                    value={formData.email}
                                    readOnly
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">
                                    New Password
                                </label>

                                <input
                                    type="password"
                                    name="password"
                                    className="form-control"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Leave blank to keep current password"
                                />
                            </div>

                            <button
                                className="btn btn-success"
                                disabled={saving}
                            >
                                {saving
                                    ? "Updating..."
                                    : "Update User"}
                            </button>

                            <button
                                type="button"
                                className="btn btn-secondary ms-2"
                                onClick={() => navigate("/users")}
                            >
                                Cancel
                            </button>

                        </form>

                    </div>

                </div>

            </div>
        </>
    );
}

export default EditUser;