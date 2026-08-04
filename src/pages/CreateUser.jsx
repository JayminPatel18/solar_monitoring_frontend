import { useState } from "react";
import Navbar from "../components/Navbar";
import { registerUser } from "../api/userApi";
import { useLocation, useNavigate } from "react-router-dom";


function CreateUser() {
    const navigate = useNavigate();
    const location = useLocation();

    const isAdminPage = location.state?.from === "admin";

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "USER"
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const validate = () => {
        if (!formData.name.trim())
            return "Name is required.";

        if (!formData.email.trim())
            return "Email is required.";

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(formData.email))
            return "Enter a valid email address.";

        if (!formData.password)
            return "Password is required.";

        if (formData.password.length < 6)
            return "Password must be at least 6 characters.";

        if (!formData.role)
            return "Role is required.";

        return "";
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setSuccess("");
        setError("");

        const validationError = validate();

        if (validationError) {
            setError(validationError);
            return;
        }

        try {
            setLoading(true);

            await registerUser(formData);

            setSuccess(
                isAdminPage
                    ? "User created successfully."
                    : "Registration successful."
            );

            setTimeout(() => {

                if (isAdminPage) {
                    navigate("/users");
                } else {
                    navigate("/");
                }

            }, 1500);

        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Failed to create user."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Navbar />

            <div className="container mt-4">

                <div className="card shadow">

                    <div className="card-header bg-success text-white">
                        <h4>
                            {isAdminPage ? "Create User" : "Register"}
                        </h4>
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
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">
                                    Email
                                </label>

                                <input
                                    type="email"
                                    name="email"
                                    className="form-control"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">
                                    Password
                                </label>

                                <input
                                    type="password"
                                    name="password"
                                    className="form-control"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                            </div>

                            {isAdminPage && (
                                <div className="mb-3">
                                    <label className="form-label">
                                        Role
                                    </label>

                                    <input
                                        name="role"
                                        className="form-control"
                                        value={formData.role}
                                        readOnly
                                    />
                                </div>
                            )}

                            <button
                                className="btn btn-success"
                                disabled={loading}
                            >
                                {
                                    loading
                                        ? (isAdminPage ? "Creating..." : "Registering...")
                                        : (isAdminPage ? "Create User" : "Register")
                                }
                            </button>

                            <button
                                type="button"
                                className="btn btn-secondary ms-2"
                                onClick={() => {

                                    if (isAdminPage) {
                                        navigate("/users");
                                    } else {
                                        navigate("/");
                                    }

                                }}
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

export default CreateUser;