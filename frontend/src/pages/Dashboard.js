import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Dashboard() {
  const params = new URLSearchParams(useLocation().search);
  const username = params.get("username");
  const navigate = useNavigate();

  useEffect(() => {
    // if no token, redirect to login
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Welcome {username} 🎉</h1>
      <button onClick={handleLogout} style={styles.logout}>Logout</button>
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    marginTop: 100
  },
  heading: {
    fontSize: 32,
    marginBottom: 20,
    color: "#333",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
  },
  logout: {
    padding: "10px 20px",
    fontSize: 16,
    backgroundColor: "#0095f6",
    color: "#fff",
    border: "none",
    borderRadius: 5,
    cursor: "pointer"
  }
};
