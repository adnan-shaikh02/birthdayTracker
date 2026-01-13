import { useState } from "react";
import Navbar from "./component/Navbar.tsx";
import TitleContent from "./component/TitleContent.tsx";
import FullPageCalendar from "./component/FullPageCal.tsx";
import AgGrid from "./component/AgGrid.tsx";
import "./styles/homepage.css";

function App() {
  const [showCalendar, setShowCalendar] = useState(true);

  const handleToggle = (isEnabled: boolean) => {
    setShowCalendar(isEnabled);
  };

  return (
    <>
      <div className="homepageNavbar" data-testid="navbar-component">
        <Navbar onSwitchChange={handleToggle} />
      </div>

      <div
        className="homepageTitleContent"
        data-testid="titlecontent-component"
      >
        <TitleContent />
      </div>

      <div
        className="homepageFullPageCal"
        data-testid={showCalendar ? "calendar-component" : "aggrid-component"}
      >
        {showCalendar ? <FullPageCalendar /> : <AgGrid />}
      </div>
    </>
  );
}

export default App;
