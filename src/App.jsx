import { useState } from "react";
import { ColorMeter } from "./ColorMeter";
import { Driver } from "./Driver";
import { ChiqueLogo } from "./ChiqueLogo";
import { ColorCamera } from "./ColorCamera";
function App() {
  const allPages = {
    ColorMeter: <ColorMeter />,
    Driver: <Driver />,
    PaintID: <ColorCamera />,
  };
  const [currentPage, setCurrentPage] = useState(allPages.PaintID);
  const [paints, setPaints] = useState([]);
  return (
    <>
      {currentPage}
      <button onClick={() => setCurrentPage(allPages.Driver)}>
        Color Wheel
      </button>
      <button onClick={() => setCurrentPage(allPages.ColorMeter)}>
        Paint Search
      </button>
      <button onClick={() => setCurrentPage(allPages.PaintID)}>
        AI Paint ID
      </button>
    </>
  );
}

export default App;
//TODO: Extract colorA and colorB
//TODO: Save Paints
