import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "../pages/LoginPage";
import DashboardPage from "../pages/DashboardPage";
import Panels from "../pages/Panels";
import PanelDetails from "../pages/PanelDetails";
import ProtectedRoute from "../components/ProtectedRoute";
import CreatePanel from "../pages/CreatePanel";
import EditPanel from "../pages/EditPanel";
import Users from "../pages/Users";
import EditUser from "../pages/EditUser";
import CreateUser from "../pages/CreateUser";
import SensorData from "../pages/SensorData";
import CreateSensorData from "../pages/CreateSensorData";


function AppRoutes() {
  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<LoginPage />}
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />

        {/* For Panels */}
        <Route
          path="/panels"
          element={
            <ProtectedRoute>
              <Panels />
            </ProtectedRoute>
          }
        />

        <Route
          path="/panels/:id"
          element={
            <ProtectedRoute>
              <PanelDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="/panels/create"
          element={
            <ProtectedRoute>
              <CreatePanel />
            </ProtectedRoute>
          }
        />

        <Route
          path="/panels/update/:id"
          element={
            <ProtectedRoute>
              <EditPanel />
            </ProtectedRoute>
          }
        />

        {/* For Users data  */}
        <Route
          path="/users"
          element={
            <ProtectedRoute roles={["ADMIN"]}>
              <Users />
            </ProtectedRoute>
          }
        />

        <Route
          path="/users/edit/:id"
          element={
            <ProtectedRoute roles={["ADMIN"]}>
              <EditUser />
            </ProtectedRoute>
          }
        />

        <Route
          path="/users/create"
          element={
            <CreateUser />
          }
        />


        {/* For Sensor data */}
        <Route
          path="/sensor-data"
          element={
            <ProtectedRoute
              roles={["USER", "TECHNICIAN", "ADMIN"]}
            >
              <SensorData />
            </ProtectedRoute>
          }
        />

        <Route
          path="/sensor-data/create"
          element={
            <ProtectedRoute
              roles={["TECHNICIAN", "ADMIN"]}
            >
              <CreateSensorData />
            </ProtectedRoute>
          }
        />


      </Routes>

    </BrowserRouter>
  );
}

export default AppRoutes;