import React from "react";
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const nav = useNavigate();
  return (
    <div className="main">
      <div className="landing">
        <div className="box">
          <h2 style={{ marginTop: 0 }}>Campaign creation</h2>
          <p style={{ color: "#6b7280" }}>
            Click the button below to start creating campaigns.
          </p>
          <div style={{ marginTop: 18 }}>
            <button className="button" onClick={() => nav("/campaigns")}>
              Create Campaign
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
