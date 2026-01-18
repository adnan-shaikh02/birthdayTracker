import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import rNoorJson from "../data/source.json";
import shaikhJson from "../data/source1.json";
import { useState } from "react";

interface FullPageCalendarProps {
  locationHref: string;
}

function FullPageCalendar({ locationHref }: FullPageCalendarProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedEvent, setSelectedEvent] = useState<any>(null);

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  //eslint-disable-next-line @typescript-eslint/no-explicit-any
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
        events={eventDetail(locationHref)}
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
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 style={{ margin: 0, marginBottom: "20px" }}>
              {selectedEvent.title}
            </h2>
            <p>
              <strong>Date:</strong> {selectedEvent.startStr}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

function eventDetail(locationHref: string) {
  const color = ["Red", "Blue", "Green", "Purple"];
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  return setJsonData(locationHref).map((item: any) => ({
    title: item.event + " - " + item.name,
    date: item.format,
    color: color[Math.floor(Math.random() * color.length)],
  }));
}

function setJsonData(locationHref: string) {
  if (locationHref.includes("shaikh-family")) {
    return shaikhJson;
  } else {
    return rNoorJson;
  }
}

export default FullPageCalendar;
