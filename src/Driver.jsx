import {
  MainColorWheel,
  ColorScheme,
  ColorCamera,
  PaintSelector,
} from "./index";
import { useEffect, useState } from "react";
import { ChiqueLogo } from "./ChiqueLogo";

function Driver(props) {
  const [colorA, setColorA] = useState(-1);
  const [colorB, setColorB] = useState(-1);
  const [colorC, setColorC] = useState(-1);
  const [colorD, setColorD] = useState(-1);
  const numSections = 36;
  function getColorForSection(index, lightness = 50) {
    return (
      "hsl(" + index * (360 / numSections) + ", 100%, " + lightness + "% )"
    );
  }
  function harmonize() {
    if (colorA === -1 || colorB === -1) {
      return;
    }
    if (colorA > colorB) {
      let temp = colorA;
      setColorA(colorB);
      setColorB(temp);
    }

    let different = colorB - colorA;
    let middle = (colorA + colorB) / 2;
    let loopSide = false;
    if (colorA + numSections - colorB < different) {
      different = colorA + numSections - colorB;
      middle = loopColor((colorA + numSections + colorB) / 2);
      loopSide = true;
    }
    const diff = (100 * different) / numSections;
    let output = [];
    if (invertColor(colorA) == colorB) {
      output.push(
        <ColorScheme
          schemes={[[colorA, colorB]]}
          getColorForSection={getColorForSection}
          schemeName="Complementary"
          key="complementary"
        />
      );
      output.push(
        <ColorScheme
          schemes={[[colorA, colorB, invertColor(colorA), invertColor(colorB)]]}
          getColorForSection={getColorForSection}
          schemeName="Tetradic"
          key="tetradic"
          setColorC={setColorC}
          setColorD={setColorD}
        />
      );
      output.push(
        <ColorScheme
          schemes={[
            [
              colorA,
              colorB,
              loopColor(colorA + numSections * 0.08),
              loopColor(colorB + 0.08 * numSections),
            ],
            [
              colorA,
              colorB,
              loopColor(colorA - numSections * 0.08),
              loopColor(colorB - 0.08 * numSections),
            ],
          ]}
          getColorForSection={getColorForSection}
          schemeName="Double Split Complementary"
          key="double"
          setColorC={setColorC}
          setColorD={setColorD}
        />
      );
    } else {
      if (diff < 28 && diff > 20) {
        output.push(
          <ColorScheme
            schemes={[
              [colorA, colorB, invertColor(colorB), invertColor(colorA)],
            ]}
            getColorForSection={getColorForSection}
            schemeName="Tetradic"
            key="tetradic"
            setColorC={setColorC}
            setColorD={setColorD}
          />
        );
      } else {
        output.push(
          <ColorScheme
            schemes={[
              [colorA, colorB, invertColor(colorB), invertColor(colorA)],
            ]}
            getColorForSection={getColorForSection}
            schemeName="Double Split Complimentary"
            key="double"
            setColorC={setColorC}
            setColorD={setColorD}
          />
        );
      }
      if (diff > 28 && diff < 40) {
        output.push(
          <ColorScheme
            schemes={[[colorA, colorB, invertColor(middle)]]}
            getColorForSection={getColorForSection}
            schemeName="Triadic"
            key="triadic"
            setColorC={setColorC}
            setColorD={setColorD}
          />
        );
      }

      if (diff <= 28) {
        if (diff <= 15) {
          output.push(
            <ColorScheme
              schemes={[
                [colorA, colorB, loopColor(middle - 1.5 * different)],
                [colorA, colorB, middle],
                [colorA, colorB, loopColor(middle + 1.5 * different)],
              ]}
              getColorForSection={getColorForSection}
              schemeName="Analogous"
              key="analogous"
              setColorC={setColorC}
              setColorD={setColorD}
            />
          );
        } else {
          output.push(
            <ColorScheme
              schemes={[[colorA, colorB, middle]]}
              getColorForSection={getColorForSection}
              schemeName="Analogous"
              key="analogous"
              setColorC={setColorC}
              setColorD={setColorD}
            />
          );
        }
        output.push(
          <ColorScheme
            schemes={[[colorA, colorB, invertColor(middle)]]}
            getColorForSection={getColorForSection}
            schemeName="Split Complementary"
            key="split"
            setColorC={setColorC}
            setColorD={setColorD}
          />
        );
      } else if (diff > 40) {
        if (loopSide) {
          output.push(
            <ColorScheme
              schemes={[
                [colorA, colorB, loopColor(colorB + 2 * different)],
                [colorA, colorB, loopColor(colorA - 2 * different)],
              ]}
              getColorForSection={getColorForSection}
              schemeName="Split Complementary"
              key="split"
              setColorC={setColorC}
              setColorD={setColorD}
            />
          );
        } else {
          output.push(
            <ColorScheme
              schemes={[
                [colorA, colorB, loopColor(colorA + 2 * different)],
                [colorA, colorB, loopColor(colorB - 2 * different)],
              ]}
              getColorForSection={getColorForSection}
              schemeName="Split Complementary"
              key="split"
              setColorC={setColorC}
              setColorD={setColorD}
            />
          );
        }
      }
    }
    return output;
  }
  function loopColor(color) {
    return (color + numSections) % numSections;
  }
  function invertColor(color) {
    return loopColor(numSections / 2 + color);
  }
  function backgroundColor() {
    const color1 = colorA >= 0 ? getColorForSection(colorA, 75) : "white";
    const color2 = colorB >= 0 ? getColorForSection(colorB, 75) : "white";
    document.body.style.background =
      "linear-gradient(to right, " + color1 + ", " + color2 + ")";
  }
  function startPaintSelector() {
    if (colorA === -1 || colorB === -1) {
      return;
    }
    if (colorC === -1) {
      return;
    }
    return (
      <>
        <PaintSelector
          h={colorA * (360 / numSections)}
          key="paintfinderA"
          style={paintSelectorStyle}
          saveColor={props.saveColor}
          removeColor={props.removeColor}
        />
        <PaintSelector
          h={colorB * (360 / numSections)}
          key="paintfinderB"
          style={paintSelectorStyle}
          saveColor={props.saveColor}
          removeColor={props.removeColor}
        />
        <PaintSelector
          h={colorC * (360 / numSections)}
          key="paintfinderC"
          style={paintSelectorStyle}
          saveColor={props.saveColor}
          removeColor={props.removeColor}
        />
        {colorD === -1 ? null : (
          <PaintSelector
            h={colorD * (360 / numSections)}
            key="paintfinderD"
            style={paintSelectorStyle}
            saveColor={props.saveColor}
            removeColor={props.removeColor}
          />
        )}
      </>
    );
  }

  useEffect(() => {
    harmonize();
    backgroundColor();
    startPaintSelector();
    document.body.style.overflow = "auto";
    return () => {
      document.body.style.overflow = "";
    };
  }, [colorA, colorB, colorC, colorD]);
  return (
    <div
      style={{
        flexDirection: "column",
      }}
    >
      <div style={{ width: "100%", height: "100%" }}>
        <h1 style={{ color: "black", textAlign: "center" }}>
          Color Harmonizer
        </h1>
        <div style={{ fontSize: 24, color: "black", textAlign: "center" }}>
          Select any two colors and get harmonious color schemes that include
          them both. Click color again to unselect. Once you select a color
          scheme you can then select a tone, tint, or shade of the color and see
          a list of similar paints. Click on a paint to save it to your list.
        </div>
        <MainColorWheel
          colorA={colorA}
          colorB={colorB}
          numSections={numSections}
          setColorA={setColorA}
          setColorB={setColorB}
          getColorForSection={getColorForSection}
        />
      </div>
      <div>{harmonize()}</div>
      {startPaintSelector()}
    </div>
  );
}
const paintSelectorStyle = {
  flexGrow: 1,
};
export { Driver };
