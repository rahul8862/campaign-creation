import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Landing from "./pages/Landing";
import Campaigns from "./pages/Campaigns";
import CampaignView from "./pages/CampaignView";

export default function App() {
  return (
    <div className="app">
      <Sidebar />
      <div style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/campaigns" element={<Campaigns />} />
          <Route path="/campaigns/view/:id" element={<CampaignView />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </div>
  );
}
