import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { login } from "../services/authServices";
import { Link } from "react-router-dom";

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { loginUser } = useContext(AuthContext)
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await login(email, password);

            loginUser(response);

            navigate("/dashboard")
        } catch (error) {
            alert("Invalid Credentials")
        }
    };

    return (
        <div className="container mt-5">
            <div className="card p-4 shadow">
                <h2 className="text-center mb-4">Solar Monitoring Login</h2>

                <form onSubmit={handleLogin}>
                    <input
                        type="email"
                        className="form-control mb-3"
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                        type="password"
                        className="form-control mb-3"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button
                        className="btn btn-primary w-100"
                    >
                        Login
                    </button>

                    <div className="text-center mt-3">
                        <p className="mb-0">
                            Don't have an account?
                        </p>

                        <Link
                            to="/users/create"
                            state={{ from: "public" }}
                            className="btn btn-outline-success mt-2"
                        >
                            Register
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginPage;