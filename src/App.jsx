import { useState } from "react";
import { ColorMeter } from "./ColorMeter";
import { Driver } from "./Driver";
import { NavBar } from "./NavBar";
import { ColorCamera } from "./ColorCamera";
import { Swatch } from "./Swatch";
function App() {
  const allPages = {
    PaintID: <ColorCamera />,
    Driver: <Driver saveColor={saveColor} removeColor={removeColor} />,
    ColorMeter: <ColorMeter />,
  };
  document.body.style.width = "100%";
  const [currentPage, setCurrentPage] = useState(allPages.Driver);
  const [paints, setPaints] = useState([]);
  function saveColor(color) {
    let arr = paints;
    arr.push(color);
    setPaints(arr);
  }
  function removeColor(color) {
    let arr = paints;
    let index = arr.indexOf(color);
    arr.splice(index, 1);
    console.log(arr);
    setPaints(arr);
  }
  function setPage(page) {
    setCurrentPage(allPages[page]);
  }
  return (
    <>
      <NavBar
        setPage={setPage}
        paints={paints}
        saveColor={saveColor}
        removeColor={removeColor}
      />
      {currentPage}
    </>
  );
}

export default App;
//TODO: Extract colorA and colorB
//TODO: Save Paints
