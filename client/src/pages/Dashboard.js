import React, { useEffect } from "react";
import jwt from "jsonwebtoken";
import { useNavigate } from "react-router-dom";
import UserList from "../UserList";
import "bootstrap/dist/css/bootstrap.min.css";

const Dashboard = () => {
  const history = useNavigate();

  async function populateDashboard() {
    const req = await fetch("http://localhost:8080/api/dashboard", {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    });
    const data = req.json();
    console.log(data);
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = jwt.decode(token);
      if (!user) {
        localStorage.removeItem("token");
        history("/login");
      } else {
        populateDashboard();
      }
    }
  });
  return (
    <div>
      <h1 className="text-center mb-5">Admin Panel</h1>
      <UserList />
    </div>
  );
};
export default Dashboard;
