import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function ProtectedRoute({ children, roles }) {

    const { auth } = useContext(AuthContext);

    if (!auth.token) {
        return <Navigate to="/" replace />;
    }

    if (
        roles &&
        !roles.includes(auth.role)
    ) {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
}

export default ProtectedRoute;