import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../api/axiosConfig";
import Navbar from "../components/Navbar";

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend
} from "recharts";

function PanelDetails() {

    const { id } = useParams();

    const [summary, setSummary] = useState(null);
    const [performance, setPerformance] = useState(null);
    const [powerData, setPowerData] = useState([]);
    const [temperatureData, setTemperatureData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const formatTime = (timestamp) => {
        const date = new Date(timestamp);

        return date.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        }) +
            " " +
            date.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit"
            });
    };

    const fetchData = async () => {

        try {

            console.log("Panel ID:", id);

            const summaryRes = await axios.get(`/api/panels/${id}/summary`);
            const performanceRes = await axios.get(`/api/analytics/performance/${id}`);
            const powerRes = await axios.get(`/api/analytics/power/${id}`);
            const tempRes = await axios.get(`/api/analytics/temperature/${id}`);

            setSummary(summaryRes.data.data);
            setPerformance(performanceRes.data.data);
            setPowerData(powerRes.data.data);
            setTemperatureData(tempRes.data.data);

        } catch (error) {
            console.error(error);
        }
    };

    const powerChartData = powerData.map((item) => ({
        time: formatTime(item.timestamp),
        power: item.power,
    }));

    const temperatureChartData = temperatureData.map((item) => ({
        time: formatTime(item.timestamp),
        temperature: item.temperature,
    }));

    return (
        <>
            <Navbar />

            <div className="container mt-4">

                <h2 className="mb-4">
                    Panel Details
                </h2>

                {summary && (

                    <div className="card shadow mb-4">

                        <div className="card-header bg-primary text-white">
                            Panel Summary
                        </div>

                        <div className="card-body">

                            <div className="row">

                                <div className="col-md-4">
                                    <strong>Name :</strong> {summary.panelName}
                                </div>

                                <div className="col-md-4">
                                    <strong>Location :</strong> {summary.location}
                                </div>

                                <div className="col-md-4">
                                    <strong>Status :</strong> {summary.status}
                                </div>

                            </div>

                            <hr />

                            <div className="row">

                                <div className="col-md-3">
                                    <strong>Capacity :</strong> {summary.capacity}
                                </div>

                                <div className="col-md-3">
                                    <strong>Latest Power :</strong> {summary.latestpower} W
                                </div>

                                <div className="col-md-3">
                                    <strong>Latest Temperature :</strong> {summary.latestTemperature} °C
                                </div>

                                <div className="col-md-3">
                                    <strong>Total Generated :</strong> {summary.totalPowerGenerated} kW
                                </div>

                            </div>

                        </div>

                    </div>
                )}

                {performance && (

                    <div className="row mb-4">

                        <div className="col-md-4">

                            <div className="card text-center shadow border-0">
                                <div className="card-body">
                                    <h5>Average Power</h5>
                                    <h3 className="text-primary fw-bold">{performance.averagePower?.toFixed(2)} W</h3>
                                </div>
                            </div>

                        </div>

                        <div className="col-md-4">

                            <div className="card text-center shadow border-0">
                                <div className="card-body">
                                    <h5>Maximum Power</h5>
                                    <h3 className="text-success">
                                        {performance.maxPower} W
                                    </h3>
                                </div>
                            </div>

                        </div>

                        <div className="col-md-4">

                            <div className="card text-center shadow border-0">
                                <div className="card-body">
                                    <h5>Minimum Power</h5>
                                    <h3 className="text-danger">{performance.minPower} W</h3>
                                </div>
                            </div>

                        </div>

                    </div>
                )}

                <div className="row">

                    {/* Power Chart */}

                    <div className="col-12 mb-4">

                        <div className="card shadow">

                            <div className="card-header bg-success text-white">
                                Power Analytics
                            </div>

                            <div className="card-body">

                                {powerData.length > 0 ? (
                                    <ResponsiveContainer width="100%" height={350}>

                                        <LineChart data={powerChartData}>

                                            <CartesianGrid strokeDasharray="3 3" />

                                            <XAxis dataKey="time" />

                                            <YAxis />

                                            <Tooltip
                                                formatter={(value) => [`${value} W`, "Power"]}
                                            />

                                            <Legend />

                                            <Line
                                                type="monotone"
                                                dataKey="power"
                                                stroke="#198754"
                                                strokeWidth={3}
                                            />

                                        </LineChart>

                                    </ResponsiveContainer>
                                ) : (
                                    <p>No power data available</p>
                                )
                                }

                            </div>

                        </div>

                    </div>

                    {/* Temperature Chart */}

                    <div className="col-12">

                        <div className="card shadow">

                            <div className="card-header bg-danger text-white">
                                Temperature Analytics
                            </div>

                            <div className="card-body">

                                {powerData.length > 0 ? (
                                    <ResponsiveContainer width="100%" height={350}>

                                        <LineChart data={temperatureChartData}>

                                            <CartesianGrid strokeDasharray="3 3" />

                                            <XAxis dataKey="time" />

                                            <YAxis />

                                            <Tooltip
                                                formatter={(value) => [`${value} °C`, "Temperature"]}
                                            />

                                            <Legend />

                                            <Line
                                                type="monotone"
                                                dataKey="temperature"
                                                stroke="#dc3545"
                                                strokeWidth={3}
                                            />

                                        </LineChart>

                                    </ResponsiveContainer>
                                ) : (
                                    <p>No power data available</p>
                                )}

                            </div>

                        </div>

                    </div>

                </div>

            </div>
        </>
    );
}

export default PanelDetails;