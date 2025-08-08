import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ identifier: "", password: "" });
  const navigate = useNavigate();

  useEffect(() => {
    // prevent going to login if already logged in
    if (localStorage.getItem("token")) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", form);
      localStorage.setItem("token", res.data.token);
      navigate(`/dashboard?username=${res.data.username}`);
    } catch (err) {
      alert(err.response?.data?.message || "Server error");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.logo}>BookByKoders</h1>
        <form onSubmit={handleSubmit} style={styles.form} autoComplete="off">
          <input
            name="identifier"
            placeholder="Username / Email / Phone"
            autoComplete="off"
            value={form.identifier}
            onChange={handleChange}
            style={styles.input}
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            autoComplete="new-password"
            value={form.password}
            onChange={handleChange}
            style={styles.input}
          />
          <button type="submit" style={styles.button}>Log In</button>
        </form>
        <div style={styles.footer}>
          <span>Don't have an account? </span>
          <Link to="/signup" style={styles.link}>Sign up</Link>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fafafa",
    height: "100vh",
  },
  container: {
    width: 350,
    padding: 40,
    border: "1px solid #dbdbdb",
    borderRadius: 8,
    backgroundColor: "#fff",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.05)",
    textAlign: "center",
  },
  logo: {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    fontSize: 32,
    color: "#0095f6",
    marginBottom: 30,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  input: {
    padding: 10,
    fontSize: 14,
    border: "1px solid #dbdbdb",
    borderRadius: 4,
    outline: "none",
  },
  button: {
    padding: 10,
    backgroundColor: "#0095f6",
    color: "#fff",
    border: "none",
    borderRadius: 4,
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: 10,
  },
  footer: {
    marginTop: 20,
    fontSize: 14,
    color: "#555",
  },
  link: {
    color: "#0095f6",
    textDecoration: "none",
    fontWeight: "bold",
  },
};
