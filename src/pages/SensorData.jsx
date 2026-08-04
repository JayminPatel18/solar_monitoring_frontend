import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import { AuthContext } from "../context/AuthContext";

import { getAllSensorData } from "../services/sensorDataService";

function SensorData() {

    const { auth } = useContext(AuthContext);

    const role = auth?.role;

    const canCreate =
        role === "ADMIN" || role === "TECHNICIAN";

    const [sensorData, setSensorData] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    useEffect(() => {

        fetchSensorData();

    }, []);

    const fetchSensorData = async () => {

        try {

            const response = await getAllSensorData();

            setSensorData(response.data.data);

        } catch (err) {

            console.error(err);

            setError("Failed to load sensor data.");

        } finally {

            setLoading(false);

        }

    };

    return (
        <>
            <Navbar />

            <div className="container mt-4">

                <div className="d-flex justify-content-between align-items-center mb-3">

                    <h2>Sensor Data</h2>

                    {canCreate && (

                        <Link
                            to="/sensor-data/create"
                            className="btn btn-success"
                        >
                            + Add Sensor Reading
                        </Link>

                    )}

                </div>

                {error && (

                    <div className="alert alert-danger">

                        {error}

                    </div>

                )}

                {loading ? (

                    <h4>Loading...</h4>

                ) : (

                    <table className="table table-striped table-hover">

                        <thead className="table-dark">

                        <tr>

                            <th>ID</th>

                            <th>Panel</th>

                            <th>Voltage (V)</th>

                            <th>Current (A)</th>

                            <th>Power (W)</th>

                            <th>Temperature (°C)</th>

                            <th>Timestamp</th>

                        </tr>

                        </thead>

                        <tbody>

                        {sensorData.length === 0 ? (

                            <tr>

                                <td
                                    colSpan="7"
                                    className="text-center"
                                >

                                    No Sensor Data Found

                                </td>

                            </tr>

                        ) : (

                            sensorData.map((reading) => (

                                <tr key={reading.id}>

                                    <td>{reading.id}</td>

                                    <td>{reading.panelName}</td>

                                    <td>{reading.voltage}</td>

                                    <td>{reading.current}</td>

                                    <td>{reading.power}</td>

                                    <td>{reading.temperature}</td>

                                    <td>
                                        {new Date(
                                            reading.timestamp
                                        ).toLocaleString()}
                                    </td>

                                </tr>

                            ))

                        )}

                        </tbody>

                    </table>

                )}

            </div>

        </>
    );
}

export default SensorData;