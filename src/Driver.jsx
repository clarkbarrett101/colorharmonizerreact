import { MainColorWheel, ColorScheme } from "./index";
import { useEffect, useState } from "react";

function Driver() {
  const [colorA, setColorA] = useState(-1);
  const [colorB, setColorB] = useState(-1);
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
          schemes={[[colorA, invertColor(colorA), colorB, invertColor(colorB)]]}
          getColorForSection={getColorForSection}
          schemeName="Tetradic"
          key="tetradic"
        />
      );
      output.push(
        <ColorScheme
          schemes={[
            [
              colorA,
              loopColor(colorA + numSections * 0.08),
              loopColor(colorB + 0.08 * numSections),
              colorB,
            ],
            [
              colorA,
              loopColor(colorA - numSections * 0.08),
              loopColor(colorB - 0.08 * numSections),
              colorB,
            ],
          ]}
          getColorForSection={getColorForSection}
          schemeName="Double Split Complementary"
          key="double"
        />
      );
    } else {
      if (diff < 28 && diff > 20) {
        output.push(
          <ColorScheme
            schemes={[
              [colorA, invertColor(colorB), invertColor(colorA), colorB],
            ]}
            getColorForSection={getColorForSection}
            schemeName="Tetradic"
            key="tetradic"
          />
        );
      } else {
        output.push(
          <ColorScheme
            schemes={[
              [colorA, invertColor(colorB), colorB, invertColor(colorA)],
            ]}
            getColorForSection={getColorForSection}
            schemeName="Double Split Complimentary"
            key="double"
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
          />
        );
      }

      if (diff <= 28) {
        if (diff <= 15) {
          output.push(
            <ColorScheme
              schemes={[
                [loopColor(middle - 1.5 * different), colorA, colorB],
                [colorA, colorB, middle],
                [loopColor(middle + 1.5 * different), colorA, colorB],
              ]}
              getColorForSection={getColorForSection}
              schemeName="Analogous"
              key="analogous"
            />
          );
        } else {
          output.push(
            <ColorScheme
              schemes={[[colorA, colorB, middle]]}
              getColorForSection={getColorForSection}
              schemeName="Analogous"
              key="analogous"
            />
          );
        }
        output.push(
          <ColorScheme
            schemes={[[colorA, invertColor(middle), colorB]]}
            getColorForSection={getColorForSection}
            schemeName="Split Complementary"
            key="split"
          />
        );
      } else if (diff > 40) {
        if (loopSide) {
          output.push(
            <ColorScheme
              schemes={[
                [colorA, loopColor(colorB + 2 * different), colorB],
                [colorA, colorB, loopColor(colorA - 2 * different)],
              ]}
              getColorForSection={getColorForSection}
              schemeName="Split Complementary"
              key="split"
            />
          );
        } else {
          output.push(
            <ColorScheme
              schemes={[
                [colorA, loopColor(colorA + 2 * different), colorB],
                [colorA, colorB, loopColor(colorB - 2 * different)],
              ]}
              getColorForSection={getColorForSection}
              schemeName="Split Complementary"
              key="split"
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

  useEffect(() => {
    harmonize();
    backgroundColor();
    document.body.style.overflow = "auto";
    return () => {
      document.body.style.overflow = "";
    };
  }, [colorA, colorB]);
  function getFlex() {
    if (document.body.clientWidth < document.body.clientHeight) {
      return {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      };
    } else {
      return {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      };
    }
  }
  return (
    <div style={getFlex()}>
      <div style={{ width: 500, height: "100%", justifyContent: "flex-start" }}>
        <h1 style={{ color: "black", textAlign: "center" }}>
          Color Harmonizer
        </h1>
        <div style={{ fontSize: 24, color: "black", textAlign: "center" }}>
          Select any two colors and get harmonious color combinations that
          include them both. Click color again to unselect.
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
    </div>
  );
}
export { Driver };
