import React from "react";
import { Button } from "react-bootstrap";
import "./Home.css";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  // const navigate = useNavigate();
  // const handleVendorOnboarding = (e) => {
  // e.preventDefault();
  // navigate("/form", { replace: true });
  // };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Welcome to Admin Dashboard!</h1>
      </div>
      <div className="dashboard-content">
        <p>This is the dashboard content.</p>
      </div>
      <div className="dashboard-footer"></div>
    </div>
  );
};

export default Dashboard;
