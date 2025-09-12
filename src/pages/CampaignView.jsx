import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";

export default function CampaignView() {
  const { id } = useParams();
  const [campaigns] = useLocalStorage("campaigns", []);
  const nav = useNavigate();
  const c = campaigns.find((x) => x.id === id);

  if (!c) {
    return (
      <div className="main">
        <div className="card">
          <p>Campaign not found.</p>
          <button onClick={() => nav("/campaigns")}>Back</button>
        </div>
      </div>
    );
  }

  return (
    <div className="main">
      <div className="card detail">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h2 style={{ margin: 0 }}>{c.name}</h2>
          <div style={{ fontSize: 13, color: "#6b7280" }}>
            {new Date(c.createdOn).toLocaleString()}
          </div>
        </div>

        <div style={{ marginTop: 12 }}>
          <div className="detail-row">
            <div className="label">Campaign Name</div>
            <div>{c.name}</div>
          </div>
          <div className="detail-row">
            <div className="label">Message</div>
            <div>{c.message}</div>
          </div>
          <div className="detail-row">
            <div className="label">Recipient's Source</div>
            <div>{c.source}</div>
          </div>
          <div className="detail-row">
            <div className="label">No. of Recipients</div>
            <div>{c.recipients}</div>
          </div>
          <div className="detail-row">
            <div className="label">Status</div>
            <div>{c.status}</div>
          </div>
          <div className="detail-row">
            <div className="label">Created On</div>
            <div>{new Date(c.createdOn).toLocaleString()}</div>
          </div>
        </div>

        <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
          <button onClick={() => nav("/campaigns")}>Back</button>
        </div>
      </div>
    </div>
  );
}
