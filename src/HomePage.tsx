import Navbar from "./component/Navbar.tsx";
import TitleContent from "./component/TitleContent.tsx";
import FullPageCalendar from "./component/FullPageCal.tsx";
import "./styles/homepage.css";

function App() {
  return (
    <>
      <div className="homepageNavbar">
        <Navbar />
      </div>

      <div className="homepageTitleContent">
        <TitleContent />
      </div>

      <div className="homepageFullPageCal">
        <FullPageCalendar />
      </div>
    </>
  );
}

export default App;
