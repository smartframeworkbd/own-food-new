// 📁 src/Pages/NotFoundPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/"); // Homepage এ redirect করবে
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        backgroundColor: "#f8f9fa",
        color: "#333",
        fontFamily: "Inter, sans-serif",
        padding: "20px",
      }}
    >
      <h1 style={{ fontSize: "6rem", margin: 0 }}>404</h1>
      <h2 style={{ fontSize: "2rem", margin: "10px 0" }}>
        Oops! Page not found
      </h2>
      <p style={{ maxWidth: "400px", margin: "10px 0", color: "#666" }}>
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <button
        onClick={goHome}
        style={{
          padding: "10px 20px",
          marginTop: "20px",
          fontSize: "1rem",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          transition: "0.3s",
        }}
        onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
        onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
      >
        Go to Homepage
      </button>
    </div>
  );
};

export default NotFoundPage;
