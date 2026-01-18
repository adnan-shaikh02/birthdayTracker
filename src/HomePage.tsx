import { useState, useEffect } from "react";
import Navbar from "./component/Navbar.tsx";
import TitleContent from "./component/TitleContent.tsx";
import FullPageCalendar from "./component/FullPageCal.tsx";
import AgGrid from "./component/AgGrid.tsx";
import "./styles/homepage.css";
import FadeLoader from "react-spinners/FadeLoader";

function App() {
  const [showCalendar, setShowCalendar] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [locationHref, setLocationHref] = useState<string>("");

  useEffect(() => {
    //eslint-disable-next-line
    setLocationHref(window.location.href);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // 1.5 seconds

    return () => clearTimeout(timer);
  }, []);

  const handleToggle = (isEnabled: boolean) => {
    setShowCalendar(isEnabled);
  };

  return (
    <>
      {isLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <FadeLoader color="#000000" loading={true} />
        </div>
      ) : (
        <>
          <div className="homepageNavbar" data-testid="navbar-component">
            <Navbar onSwitchChange={handleToggle} />
          </div>

          <div
            className="homepageTitleContent"
            data-testid="titlecontent-component"
          >
            <TitleContent locationHref={locationHref} />
          </div>

          <div
            className="homepageFullPageCal"
            data-testid={
              showCalendar ? "calendar-component" : "aggrid-component"
            }
          >
            {showCalendar ? (
              <FullPageCalendar locationHref={locationHref} />
            ) : (
              <AgGrid locationHref={locationHref} />
            )}
          </div>
        </>
      )}
    </>
  );
}

export default App;
