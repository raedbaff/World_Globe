import CountryNamePopup from "./components/countryNamePopup/CountryNamePopup";
import Globe from "./components/Globe";

function App() {
  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      <Globe />
      <CountryNamePopup />
    </div>
  );
}

export default App;
