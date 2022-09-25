import React, { useEffect } from "react";
import jwt from "jsonwebtoken";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const history = useNavigate();

  async function populateDashboard() {
    const req = await fetch("http://localhost:1337/api/dashboard", {
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
  return <h1>Hello World</h1>;
};
export default Dashboard;
