import rNoorJson from "../data/source.json";
import shaikhJson from "../data/source1.json";

interface TitleContentProps {
  locationHref: string;
}

function TitleContent({ locationHref }: TitleContentProps) {
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
      <h2 className="titleContent-secondary">{secondaryTitle(locationHref)}</h2>
    </div>
  );
}

function secondaryTitle(locationHref: string) {
  const date =
    new Date().getFullYear() +
    "-" +
    String(new Date().getMonth() + 1).padStart(2, "0") +
    "-" +
    String(new Date().getDate()).padStart(2, "0");
  const todayEvents = setJsonData(locationHref).filter(
    (event) => event.format === date,
  );

  if (todayEvents.length > 0) {
    const eventNames = todayEvents.map((event) => event.name).join(", ");
    const eventType = todayEvents[0].event;
    return (
      <>
        Today is {eventNames} {eventType}
      </>
    );
  }
  return <>No events for today</>;
}

function setJsonData(locationHref: string) {
  if (locationHref.includes("shaikh-family")) {
    return shaikhJson;
  } else {
    return rNoorJson;
  }
}

export default TitleContent;
