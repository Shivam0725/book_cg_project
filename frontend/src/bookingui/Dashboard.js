import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Dashboard() {
  const params = new URLSearchParams(useLocation().search);
  const username = params.get("username");

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div>
      {/* Top Navigation Bar */}
      <div style={styles.navbar}>
        <div style={styles.logo}>BookByKoders</div>
        <div>
          <button onClick={handleLogout} style={styles.logoutButton}>
            Logout
          </button>
        </div>
      </div>

      {/* Welcome Banner */}
      <div style={styles.banner}>
        <h2>Welcome {username} </h2>
        
      </div>

      {/* Recommended Movies */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Recommended Movies</h3>
        <div style={styles.moviesGrid}>
          {[
            { title: "Sample Movie 1", url: "https://example.com/movie1" },
            { title: "Sample Movie 2", url: "https://example.com/movie2" },
            { title: "Sample Movie 3", url: "https://example.com/movie3" },
            { title: "Sample Movie 4", url: "https://example.com/movie4" },
            { title: "Sample Movie 5", url: "https://example.com/movie5" }
          ].map((movie, index) => (
            <a
              key={index}
              href={movie.url}
              target="_blank"
              rel="noopener noreferrer"
              style={styles.movieCard}
            >
              <img
                src={`https://via.placeholder.com/150x220?text=${movie.title.replace(
                  /\s/g,
                  "+"
                )}`}
                alt={movie.title}
                style={styles.movieImage}
              />
              <div style={styles.movieTitle}>{movie.title}</div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

const styles = {
  navbar: {
    backgroundColor: "#f84464",
    color: "#fff",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 30px",
    fontSize: "20px",
    fontWeight: "bold"
  },
  logo: {
    fontFamily: "cursive",
    fontSize: "24px"
  },
  logoutButton: {
    backgroundColor: "#fff",
    color: "#f84464",
    border: "none",
    padding: "8px 16px",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "bold"
  },
  banner: {
    backgroundColor: "#1c1c1c",
    color: "#fff",
    padding: "30px 20px",
    textAlign: "center",
    fontSize: "24px"
  },
  section: {
    padding: "30px 20px",
    backgroundColor: "#f2f2f2"
  },
  sectionTitle: {
    fontSize: "22px",
    fontWeight: "bold",
    marginBottom: "20px"
  },
  moviesGrid: {
    display: "flex",
    gap: "20px",
    flexWrap: "wrap"
  },
  movieCard: {
    backgroundColor: "#fff",
    borderRadius: "6px",
    overflow: "hidden",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    textDecoration: "none",
    color: "black",
    width: "150px"
  },
  movieImage: {
    width: "150px",
    height: "220px",
    objectFit: "cover"
  },
  movieTitle: {
    textAlign: "center",
    padding: "10px",
    fontWeight: "bold"
  }
};
