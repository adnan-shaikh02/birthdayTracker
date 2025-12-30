import eventDetailJson from "../data/source.json";

function TitleContent() {
  const hour = new Date().getHours();

  const greeting =
    hour < 12
      ? "Good Morning"
      : hour < 17
      ? "Good Afternoon"
      : hour < 21
      ? "Good Evening"
      : "Good Night";

  return (
    <div className="titleContent-container">
      <h1 className="titleContent-greeting">{greeting}</h1>
      <h2 className="titleContent-secondary">{secondaryTitle()}</h2>
    </div>
  );
}

function secondaryTitle() {
  const date =
    new Date().getFullYear() +
    "-" +
    String(new Date().getMonth() + 1).padStart(2, "0") +
    "-" +
    String(new Date().getDate()).padStart(2, "0");
  const todayEvents = eventDetailJson.filter((event) => event.format === date);

  if (todayEvents.length > 0) {
    const eventNames = todayEvents.map((event) => event.name).join(", ");
    const eventType = todayEvents[0].event;
    return (
      <h2>
        Today is {eventNames} {eventType}
      </h2>
    );
  } else {
    return <h2>No events for Today</h2>;
  }
}

export default TitleContent;
