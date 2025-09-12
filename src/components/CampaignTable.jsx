import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function CampaignTable({ campaigns, onView, onEdit, onDelete }) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sourceFilter, setSourceFilter] = useState("");

  const filtered = campaigns.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      (c.message || "").toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter ? c.status === statusFilter : true;
    const matchesSource = sourceFilter ? c.source === sourceFilter : true;
    return matchesSearch && matchesStatus && matchesSource;
  });

  return (
    <div>
      <div className="controls">
        <input
          className="search"
          placeholder="Search by name or message"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Status</option>
          <option>Draft</option>
          <option>Approval pending</option>
          <option>Scheduled</option>
          <option>Aborted</option>
          <option>Ongoing</option>
        </select>
        <select
          value={sourceFilter}
          onChange={(e) => setSourceFilter(e.target.value)}
        >
          <option value="">All Sources</option>
          <option>IaaS</option>
          <option>PaaS</option>
          <option>SaaS</option>
        </select>
      </div>

      <table className="table" role="table" aria-label="Campaigns table">
        <thead>
          <tr>
            <th>Campaign Name</th>
            <th>Message</th>
            <th>Recipeint's Source</th>
            <th>No. of Recipients</th>
            <th>Status</th>
            <th>Created On</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filtered.length === 0 && (
            <tr>
              <td colSpan="7" style={{ padding: 20, color: "#6b7280" }}>
                No campaigns found.
              </td>
            </tr>
          )}
          {filtered.map((c) => (
            <TableRow
              key={c.id}
              campaign={c}
              onView={onView}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

function TableRow({ campaign, onView, onEdit, onDelete }) {
  const [open, setOpen] = useState(false);
  const created = campaign.createdOn
    ? new Date(campaign.createdOn).toLocaleDateString()
    : "";

  return (
    <tr>
      <td style={{ width: 200 }}>{campaign.name}</td>
      <td style={{ width: 300 }}>
        {campaign.message?.length > 60
          ? campaign.message.slice(0, 60) + "…"
          : campaign.message}
      </td>
      <td style={{ width: 100 }}>{campaign.source}</td>
      <td style={{ width: 90 }}>{campaign.recipients}</td>
      <td style={{ width: 110 }}>{campaign.status}</td>
      <td style={{ width: 110 }}>{created}</td>
      <td style={{ width: 80, textAlign: "right", position: "relative" }}>
        <div className="row-actions">
          <button
            onClick={() => setOpen((s) => !s)}
            aria-haspopup="true"
            aria-expanded={open}
            title="Actions"
          >
            ⋯
          </button>
          {open && (
            <div
              className="menu"
              role="menu"
              onMouseLeave={() => setOpen(false)}
            >
              <button
                onClick={() => {
                  setOpen(false);
                  onView(campaign.id);
                }}
              >
                View
              </button>
              <button
                onClick={() => {
                  setOpen(false);
                  onEdit(campaign);
                }}
              >
                Edit
              </button>
              <button
                onClick={() => {
                  setOpen(false);
                  if (confirm("Delete this campaign?")) onDelete(campaign.id);
                }}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </td>
    </tr>
  );
}
