import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import {
    getUsers,
    deleteUser
} from "../api/userApi";

function Users() {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {

        try {

            const response = await getUsers();

            console.log(response);

            setUsers(response);

        } catch (err) {

            console.error(err);

            setError("Failed to load users");

        } finally {

            setLoading(false);

        }
    };

    const getRoleBadge = (role) => {

        switch (role) {

            case "ADMIN":
                return (
                    <span className="badge bg-danger">
                        ADMIN
                    </span>
                );

            case "TECHNICIAN":
                return (
                    <span className="badge bg-warning text-dark">
                        TECHNICIAN
                    </span>
                );

            default:
                return (
                    <span className="badge bg-primary">
                        USER
                    </span>
                );
        }
    };

    const handleDelete = async (id) => {

        const confirmDelete =
            window.confirm(
                "Are you sure you want to delete this user?"
            );

        if (!confirmDelete) return;

        try {

            await deleteUser(id);

            loadUsers();

        } catch (error) {

            console.error(error);

            alert("Failed to delete user");
        }
    };

    return (
        <>
            <Navbar />

            <div className="container mt-4">


                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h2>User Management</h2>

                    <Link
                        to="/users/create"
                        state={{ from: "admin" }}
                        className="btn btn-success"
                    >
                        + Create User
                    </Link>
                </div>

                {error && (
                    <div className="alert alert-danger">
                        {error}
                    </div>
                )}

                {loading ? (

                    <h4>Loading...</h4>

                ) : (

                    <div className="card shadow">

                        <div className="card-body">

                            <table className="table table-striped">

                                <thead>

                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Role</th>
                                        <th>Actions</th>
                                    </tr>

                                </thead>

                                <tbody>

                                    {users.map((user) => (

                                        <tr key={user.id}>

                                            <td>{user.id}</td>

                                            <td>{user.name}</td>

                                            <td>{user.email}</td>

                                            <td>
                                                {getRoleBadge(user.role)}
                                            </td>

                                            <td>

                                                <Link
                                                    to={`/users/edit/${user.id}`}
                                                    className="btn btn-primary btn-sm"
                                                >
                                                    Edit
                                                </Link>

                                                <button
                                                    className="btn btn-danger btn-sm"
                                                    onClick={() =>
                                                        handleDelete(user.id)
                                                    }
                                                >
                                                    Delete
                                                </button>

                                            </td>

                                        </tr>

                                    ))}

                                </tbody>

                            </table>

                        </div>

                    </div>

                )}

            </div>
        </>
    );
}

export default Users;