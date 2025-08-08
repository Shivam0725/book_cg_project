import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const [form, setForm] = useState({
    email: "",
    phone: "",
    fullName: "",
    username: "",
    password: "",
    otp: ""
  });

  const navigate = useNavigate();

  useEffect(() => {
    // prevent going to signup if already logged in
    if (localStorage.getItem("token")) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/signup", form);
      localStorage.setItem("token", res.data.token);
      navigate(`/dashboard?username=${res.data.username}`);
    } catch (err) {
      alert(err.response?.data?.message || "Server error");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <h1 style={styles.logo}>BookByKoders</h1>
        <form onSubmit={handleSubmit} autoComplete="off">
          <input
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            autoComplete="off"
          />
          <input
            name="phone"
            placeholder="Phone"
            value={form.phone}
            onChange={handleChange}
            autoComplete="off"
          />
          <input
            name="fullName"
            placeholder="Full Name"
            value={form.fullName}
            onChange={handleChange}
            autoComplete="off"
          />
          <input
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            autoComplete="off"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            autoComplete="new-password"
          />
          <input
            name="otp"
            placeholder="Enter OTP (000000)"
            value={form.otp}
            onChange={handleChange}
            autoComplete="off"
          />
          <button type="submit">Sign Up</button>
        </form>
        <p style={styles.switch}>
          Already have an account? <Link to="/">Log in</Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh"
  },
  box: {
    width: 320,
    border: "1px solid #ddd",
    padding: 20,
    background: "white",
    borderRadius: 8
  },
  logo: {
    fontFamily: "cursive",
    textAlign: "center",
    color: "#0095f6"
  },
  switch: {
    textAlign: "center",
    marginTop: 10
  }
};
