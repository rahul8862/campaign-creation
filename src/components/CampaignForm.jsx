import React, { useState, useEffect } from "react";

export default function CampaignForm({ initial, onSave, onClose }) {
  const [form, setForm] = useState({
    name: "",
    message: "",
    source: "IaaS",
    recipients: 0,
    status: "Draft",
    createdOn: new Date().toISOString().slice(0, 10),
  });

  useEffect(() => {
    if (initial) {
      setForm({
        name: initial.name || "",
        message: initial.message || "",
        source: initial.source || "IaaS",
        recipients: initial.recipients || 0,
        status: initial.status || "Draft",
        createdOn: initial.createdOn
          ? initial.createdOn.slice(0, 10)
          : new Date().toISOString().slice(0, 10),
      });
    }
  }, [initial]);

  function update(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function submit(e) {
    e.preventDefault();
    if (!form.name.trim()) {
      alert("Please enter campaign name");
      return;
    }
    if (!form.message.trim()) {
      alert("Please enter message");
      return;
    }
    const data = {
      ...form,
      recipients: Number(form.recipients),
      createdOn: form.createdOn,
    };
    onSave(data);
  }

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <div className="modal card">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 12,
          }}
        >
          <h3 style={{ margin: 0 }}>Create / Edit Campaign</h3>
          <button onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>

        <form onSubmit={submit}>
          <div className="form-grid">
            <div>
              <div className="form-row">
                <label>Campaign Name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                />
              </div>

              <div className="form-row">
                <label>Recipients Source</label>
                <select
                  value={form.source}
                  onChange={(e) => update("source", e.target.value)}
                >
                  <option>IaaS</option>
                  <option>PaaS</option>
                  <option>SaaS</option>
                </select>
              </div>

              <div className="form-row">
                <label>No. of Recipients</label>
                <input
                  type="number"
                  min="0"
                  value={form.recipients}
                  onChange={(e) => update("recipients", e.target.value)}
                />
              </div>
            </div>

            <div>
              <div className="form-row">
                <label>Message</label>
                <textarea
                  value={form.message}
                  onChange={(e) => update("message", e.target.value)}
                />
              </div>

              <div className="form-row">
                <label>Status</label>
                <select
                  value={form.status}
                  onChange={(e) => update("status", e.target.value)}
                >
                  <option>Draft</option>
                  <option>Approval pending</option>
                  <option>Scheduled</option>
                  <option>Aborted</option>
                  <option>Ongoing</option>
                </select>
              </div>

              <div className="form-row">
                <label>Created On</label>
                <input
                  type="date"
                  value={form.createdOn}
                  onChange={(e) => update("createdOn", e.target.value)}
                />
              </div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 8,
              marginTop: 12,
            }}
          >
            <button
              type="button"
              onClick={onClose}
              style={{ padding: "8px 12px", borderRadius: 8 }}
            >
              Cancel
            </button>
            <button className="button" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
