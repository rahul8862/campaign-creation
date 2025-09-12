import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <h1
        style={{ fontSize: "5rem", fontWeight: "bold", marginBottom: "1rem" }}
      >
        Campaign creation
      </h1>
      <p style={{ fontSize: "1.25rem", marginBottom: "2rem" }}>
        Click the button below to start creating campaigns
      </p>

      <Link to="/campaigns">
        <button
          style={{
            padding: "0.75rem 1.5rem",
            backgroundColor: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "8px",
            fontSize: "1rem",
            cursor: "pointer",
          }}
        >
          Get Started
        </button>
      </Link>
    </div>
  );
}
