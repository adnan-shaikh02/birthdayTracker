import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import eventDetailJson from "../data/source.json";
import { useState } from "react";

function FullPageCalendar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  const handleEventClickWrapper = (clickInfo: any) => {
    setSelectedEvent(clickInfo.event);
    setIsModalOpen(true);
  };

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        weekends={true}
        events={eventDetail()}
        eventClick={handleEventClickWrapper}
      />

      {isModalOpen && selectedEvent && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
          onClick={handleModalClose}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "30px",
              borderRadius: "8px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              maxWidth: "500px",
              width: "90%",
              fontFamily: "'Segoe UI', 'Poppins', 'Inter', sans-serif",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 style={{ margin: 0, marginBottom: "20px", fontFamily: "'Poppins', 'Segoe UI', sans-serif", fontSize: "28px", fontWeight: "700", color: "#111827" }}>{selectedEvent.title}</h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "16px", color: "#6b7280", lineHeight: "1.6" }}>
              <strong>Date:</strong> {selectedEvent.startStr}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}


function eventDetail() {
  // Standard color palette
  const colors = [
    "#FF6B6B", // red
    "#3498DB", // blue
    "#2ECC71", // green
    "#FF69B4", // pink
  ];

  return eventDetailJson.map((item: any, index: number) => ({
    title: item.event + " - " + item.name,
    date: item.format,
    backgroundColor: colors[index % colors.length],
    borderColor: colors[index % colors.length],
    textColor: "#000000",
  }));
}

export default FullPageCalendar;
