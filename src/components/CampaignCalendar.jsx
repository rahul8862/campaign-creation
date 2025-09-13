import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import { format } from "date-fns";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";

const localizer = momentLocalizer(moment);

export default function CampaignCalendar({ campaigns, onSelect }) {
  const events = campaigns.map((c) => ({
    id: c.id,
    title: c.name,
    start: new Date(c.createdOn),
    end: new Date(c.createdOn),
    resource: c,
  }));

  return (
    <div style={{ height: "80vh" }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        views={["month", "week", "day"]}
        defaultView="month"
        popup
        style={{ background: "white", borderRadius: "12px", padding: "10px" }}
        onSelectEvent={(event) => onSelect(event.resource.id)}
      />
    </div>
  );
}
