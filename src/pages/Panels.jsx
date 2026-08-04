import axios from "../api/axiosConfig";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";

function Panels() {

    const [panels, setPanels] = useState([]);

    const { auth } = useContext(AuthContext);

    const role = auth?.role;

    const canManagePanels =
        role === "ADMIN" || role === "TECHNICIAN";

    useEffect(() => {
        fetchPanels();
    }, []);

    const fetchPanels = async () => {

        try {

            const response = await axios.get("/api/panels");

            setPanels(response.data);

        } catch (error) {

            console.error("Panels Error:", error);
        }
    };

    const handleDelete = async (id) => {

        const confirmed = window.confirm(
            "Are you sure you want to delete this panel?"
        );

        if (!confirmed) {
            return;
        }

        try {

            await axios.delete(`/api/panels/delete/${id}`);

            fetchPanels();

        } catch (error) {

            console.error("Delete Error:", error);

            alert("Failed to delete panel");
        }
    };

    return (
        <>
            <Navbar />

            <div className="container mt-4">

                <div className="d-flex justify-content-between mb-3">

                    <h2>Solar Panels</h2>

                    {canManagePanels && (
                        <Link
                            to="/panels/create"
                            className="btn btn-success"
                        >
                            Add Panel
                        </Link>
                    )}

                </div>

                <table className="table table-striped table-hover">

                    <thead className="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>Panel Name</th>
                            <th>Location</th>
                            <th>Capacity</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>

                        {panels.map((panel) => (

                            <tr key={panel.id}>

                                <td>{panel.id}</td>
                                <td>{panel.panelName}</td>
                                <td>{panel.location}</td>
                                <td>{panel.capacity}</td>
                                <td>{panel.status}</td>

                                <td>

                                    <div className="d-flex gap-2">

                                        <Link
                                            to={`/panels/${panel.id}`}
                                            className="btn btn-primary btn-sm"
                                        >
                                            View
                                        </Link>

                                        {canManagePanels && (
                                            <Link
                                                to={`/panels/update/${panel.id}`}
                                                className="btn btn-warning btn-sm"
                                            >
                                                Edit
                                            </Link>
                                        )}

                                        {canManagePanels && (
                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() => handleDelete(panel.id)}
                                            >
                                                Delete
                                            </button>
                                        )}

                                    </div>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>
        </>
    );
}

export default Panels;