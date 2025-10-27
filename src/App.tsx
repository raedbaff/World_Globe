import CountryNamePopup from "./components/countryNamePopup/CountryNamePopup";
import Globe from "./components/Globe";

function App() {
  const madeBy = import.meta.env.VITE_MADE_BY ?? "Made with 🤍 by Raed Baffoun";
  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      <Globe />
      <CountryNamePopup />
      <h5 style={{position:"absolute",left: "1rem",bottom:"0.5rem"}}>{madeBy}</h5>
    </div>
  );
}

export default App;
