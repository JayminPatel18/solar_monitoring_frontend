import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";


import axios from "../api/axiosConfig"
import { createSensorData } from "../services/sensorDataService";

function CreateSensorData() {
  const navigate = useNavigate();

  const [panels, setPanels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    panelId: "",
    voltage: "",
    current: "",
    power: "",
    temperature: "",
  });

  useEffect(() => {
    loadPanels();
  }, []);

  const loadPanels = async () => {
    try {
      const response = await axios.get("/api/panels");
      setPanels(response.data);
    } catch (err) {
      setError("Failed to load panels.");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    if (!formData.panelId) return "Please select panel.";
    if (!formData.voltage) return "Voltage is required.";
    if (!formData.current) return "Current is required.";
    if (!formData.power) return "Power is required.";
    if (!formData.temperature) return "Temperature is required.";

    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    const validationError = validate();

    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);

    try {
      const payload = {
        voltage: Number(formData.voltage),
        current: Number(formData.current),
        power: Number(formData.power),
        temperature: Number(formData.temperature),
        panel: {
          id: Number(formData.panelId),
        },
      };

      const response = await createSensorData(payload);

      setSuccess(response.data.message);

      setTimeout(() => {
        navigate("/sensor-data");
      }, 1200);
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to create sensor data."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-lg-7">
            <div className="card shadow">
              <div className="card-header bg-primary text-white">
                <h4 className="mb-0">Add Sensor Reading</h4>
              </div>

              <div className="card-body">
                {error && <div className="alert alert-danger">{error}</div>}

                {success && (
                  <div className="alert alert-success">{success}</div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Panel</label>

                    <select
                      className="form-select"
                      name="panelId"
                      value={formData.panelId}
                      onChange={handleChange}
                    >
                      <option value="">Select Panel</option>

                      {panels.map((panel) => (
                        <option key={panel.id} value={panel.id}>
                          {panel.panelName}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Voltage</label>

                    <input
                      type="number"
                      step="0.01"
                      name="voltage"
                      className="form-control"
                      value={formData.voltage}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Current</label>

                    <input
                      type="number"
                      step="0.01"
                      name="current"
                      className="form-control"
                      value={formData.current}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Power</label>

                    <input
                      type="number"
                      step="0.01"
                      name="power"
                      className="form-control"
                      value={formData.power}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Temperature</label>

                    <input
                      type="number"
                      step="0.01"
                      name="temperature"
                      className="form-control"
                      value={formData.temperature}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="d-flex justify-content-between">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => navigate("/sensor-data")}
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={loading}
                    >
                      {loading ? "Saving..." : "Save Sensor Reading"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateSensorData;