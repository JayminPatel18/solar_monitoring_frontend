import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

import { getDashboardSummary }
    from "../services/dashboardService";
import Navbar from "../components/Navbar";
import {
    FaUsers,
    FaSolarPanel,
    FaCheckCircle,
    FaExclamationTriangle,
    FaFire,
    FaChartLine,
    FaUserPlus,
    FaPlus
} from "react-icons/fa";

import "./DashboardPage.css";


function DashboardPage() {

    const { auth, logoutUser } = useContext(AuthContext);
    const role = auth?.role;

    const navigate = useNavigate();

    const [summary, setSummary] =
        useState(null);

    useEffect(() => {

        loadDashboard();

    }, []);

    const loadDashboard = async () => {

        try {

            const response =
                await getDashboardSummary();

            setSummary(response.data);
            console.log(auth)
            console.log(role)

        } catch (error) {

            console.error(error);

        }
    };

    const handleLogout = () => {

        logoutUser();

        navigate("/");

    };

    const DashboardCard = ({ title, value, icon, onClick, color }) => (
        <div className="col-md-4 mb-4">
            <div
                className="card shadow dashboard-card border-0"
                onClick={onClick}
                style={{ cursor: "pointer" }}
            >
                <div className="card-body d-flex justify-content-between align-items-center">
                    <div>
                        <h6 className="text-muted">{title}</h6>
                        <h2>{value}</h2>
                    </div>

                    <div
                        className="fs-1"
                        style={{ color }}
                    >
                        {icon}
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <>
            <Navbar />

            <div className="container mt-4">

                <div className="d-flex justify-content-between">

                    <h2>
                        Smart Solar Monitoring Dashboard
                    </h2>


                </div>

                <hr />

                {!summary ? (

                    <h4>Loading...</h4>

                ) : (

                    <div className="row">

                        <DashboardCard
                            title="Total Users"
                            value={summary.totalUsers}
                            icon={<FaUsers />}
                            color="#0d6efd"
                        />

                        <DashboardCard
                            title="Total Panels"
                            value={summary.totalPanels}
                            icon={<FaSolarPanel />}
                            color="#198754"
                        />

                        <DashboardCard
                            title="Active Panels"
                            value={summary.activePanels}
                            icon={<FaCheckCircle />}
                            color="#20c997"
                        />

                        <DashboardCard
                            title="Fault Panels"
                            value={summary.faultPanels}
                            icon={<FaExclamationTriangle />}
                            color="#dc3545"
                        />

                        <DashboardCard
                            title="Overheated Panels"
                            value={summary.overheatedPanels}
                            icon={<FaFire />}
                            color="#fd7e14"
                        />

                        <DashboardCard
                            title="Sensor Readings"
                            value={summary.totalSensorReadings}
                            icon={<FaChartLine />}
                            color="#6f42c1"
                        />

                        

                        <div className="card shadow mt-3 border-0">
                            <div className="card-body">

                                <h4 className="mb-4">
                                    Quick Actions
                                </h4>

                                <div className="row">

                                    {role === "ADMIN" && (
                                        <div className="col-md-3 mb-3">
                                        <Link
                                            to="/users/create"
                                            state={{ from: "admin" }}
                                            className="btn btn-primary w-100"
                                        >
                                            <FaUserPlus className="me-2" />
                                            Create User
                                        </Link>

                                    </div>
                                    )}

                                    <div className="col-md-3 mb-3">
                                        <button
                                            className="btn btn-success w-100"
                                            onClick={() => navigate("/panels/create")}
                                        >
                                            <FaPlus className="me-2" />
                                            Create Panel
                                        </button>
                                    </div>

                                    {role === "ADMIN" && (
                                        <div className="col-md-3 mb-3">
                                        <button
                                            className="btn btn-outline-primary w-100"
                                            onClick={() => navigate("/users")}
                                        >
                                            View Users
                                        </button>
                                    </div>
                                    )}

                                    <div className="col-md-3 mb-3">
                                        <button
                                            className="btn btn-outline-success w-100"
                                            onClick={() => navigate("/panels")}
                                        >
                                            View Panels
                                        </button>
                                    </div>

                                </div>

                            </div>
                        </div>

                    </div>





                )}

            </div>

        </>
    );
}

export default DashboardPage;