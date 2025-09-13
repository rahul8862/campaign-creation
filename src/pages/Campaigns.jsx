import React, { useState } from "react";
import CampaignForm from "../components/CampaignForm";
import CampaignTable from "../components/CampaignTable";
import CampaignCalendar from "../components/CampaignCalendar";
import useLocalStorage from "../hooks/useLocalStorage";
import { useNavigate } from "react-router-dom";

export default function Campaigns() {
  const [campaigns, setCampaigns] = useLocalStorage("campaigns", []);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [view, setView] = useState("table");
  const nav = useNavigate();

  function handleSave(data) {
    if (editing) {
      setCampaigns((prev) =>
        prev.map((p) =>
          p.id === editing.id ? { ...p, ...data, id: editing.id } : p
        )
      );
      setEditing(null);
    } else {
      const id = Date.now().toString();
      setCampaigns((prev) => [{ id, ...data }, ...prev]);
    }
    setShowForm(false);
  }

  function handleEdit(campaign) {
    setEditing(campaign);
    setShowForm(true);
  }

  function handleDelete(id) {
    setCampaigns((prev) => prev.filter((p) => p.id !== id));
  }

  function handleView(id) {
    nav(`/campaigns/view/${id}`);
  }

  return (
    <div className="main">
      <div className="page-header">
        <div className="page-title">Campaigns</div>
        <div className="header-actions">
          <button
            onClick={() => setView(view === "table" ? "calendar" : "table")}
            className="button"
          >
            {view === "table" ? "Calendar View" : "Table View"}
          </button>
          <button
            onClick={() => {
              setEditing(null);
              setShowForm(true);
            }}
            className="button"
          >
            Create Campaign
          </button>
        </div>
      </div>

      <div className="content-grid">
        <div className="card">
          {view === "table" ? (
            <CampaignTable
              campaigns={campaigns}
              onView={handleView}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ) : (
            <CampaignCalendar campaigns={campaigns} onSelect={handleView} />
          )}
        </div>
      </div>

      {showForm && (
        <CampaignForm
          initial={editing}
          onSave={handleSave}
          onClose={() => {
            setShowForm(false);
            setEditing(null);
          }}
        />
      )}
    </div>
  );
}
