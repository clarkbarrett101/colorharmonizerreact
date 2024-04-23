import React, { useEffect, useRef } from "react";
function ChiqueLogo() {
  const canvas = useRef(null);
  canvas.width = 100;
  canvas.height = canvas.width;
  const logo = new Image();
  const slogan = new Image();
  slogan.src = "./slogan.svg";
  logo.src = "./Asset 1.svg";
  const scalar = canvas.width / 100;
  logo.width = 100 * scalar;
  logo.height = (155 / 555) * logo.width;
  slogan.width = 100 * scalar;
  function drawShapes(ctx, shapes) {
    generateColors(Math.random() * 2);
    shapes.forEach((shape) => {
      ctx.beginPath();
      ctx.fillStyle = hslToCSS(styles[shape.class]);
      shape.points.forEach(([x, y], index) => {
        if (index === 0) {
          ctx.moveTo(x * scalar, y * scalar);
        } else {
          ctx.lineTo(x * scalar, y * scalar);
        }
      });
      ctx.closePath();
      ctx.fill();
    });
    ctx.drawImage(
      logo,
      0,
      canvas.height / 2 - logo.height / 2,
      logo.width,
      logo.height
    );
    requestAnimationFrame(() => drawShapes(ctx, shapes));
  }

  let styles = Object.fromEntries(
    Object.entries(ogColors).map(([cls, color]) => [cls, hexToHSL(color)])
  );

  function generateColors(offset) {
    const colors = styles;
    for (const [cls, hsl] of Object.entries(styles)) {
      const [h, s, l] = hsl;
      colors[cls] = [h + offset, s, l];
    }
    styles = colors;
  }
  function hexToHSL(H) {
    let r = 0,
      g = 0,
      b = 0;
    if (H.length == 4) {
      r = "0x" + H[1] + H[1];
      g = "0x" + H[2] + H[2];
      b = "0x" + H[3] + H[3];
    } else if (H.length == 7) {
      r = "0x" + H[1] + H[2];
      g = "0x" + H[3] + H[4];
      b = "0x" + H[5] + H[6];
    }
    r /= 255;
    g /= 255;
    b /= 255;
    let cmin = Math.min(r, g, b),
      cmax = Math.max(r, g, b),
      delta = cmax - cmin,
      h = 0,
      s = 0,
      l = 0;
    if (delta == 0) h = 0;
    else if (cmax == r) h = ((g - b) / delta) % 6;
    else if (cmax == g) h = (b - r) / delta + 2;
    else h = (r - g) / delta + 4;
    h = Math.round(h * 60);
    if (h < 0) h += 360;
    l = (cmax + cmin) / 2;
    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
    s = +(s * 170).toFixed(1);
    l = +(l * 100).toFixed(1);
    return [h, s, l];
  }
  function hslToCSS(hsl) {
    const [h, s, l] = hsl;

    return `hsl(${h % 360}, ${s}%, ${l}%)`;
  }
  useEffect(() => {
    const ctx = canvas.current.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawShapes(ctx, shapes);
  }, []);
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        right: 0,
        width: 100,
        height: 100,
      }}
    >
      <canvas ref={canvas} />
      <img
        src={slogan.src}
        alt="Asthetic Design Software"
        width={80}
        style={{ top: -60, position: "relative", left: 10 }}
      />
    </div>
  );
}
const shapes = [
  {
    class: "cls-6",
    points: [
      [35, 5],
      [67, 5],
      [50, 8],
      [35, 5],
    ],
  },
  {
    class: "cls-4",
    points: [
      [50, 8],
      [67, 5],
      [72, 19],
      [50, 8],
    ],
  },
  {
    class: "cls-28",
    points: [
      [67, 5],
      [72, 19],
      [90, 25],
      [67, 5],
    ],
  },
  {
    class: "cls-14",
    points: [
      [72, 19],
      [88, 42],
      [90, 25],
      [72, 19],
    ],
  },
  {
    class: "cls-5",
    points: [
      [90, 25],
      [88, 42],
      [95, 54],
      [90, 25],
    ],
  },
  {
    class: "cls-23",
    points: [
      [88, 42],
      [84, 68],
      [95, 54],
      [88, 42],
    ],
  },
  {
    class: "cls-15",
    points: [
      [84, 68],
      [84, 78],
      [95, 54],
      [84, 68],
    ],
  },
  {
    class: "cls-20",
    points: [
      [84, 68],
      [84, 78],
      [67, 89],
      [84, 68],
    ],
  },
  {
    class: "cls-24",
    points: [
      [58, 80],
      [84, 68],
      [67, 89],
      [58, 80],
    ],
  },
  {
    class: "cls-13",
    points: [
      [58, 80],
      [38, 93],
      [67, 89],
      [58, 80],
    ],
  },
  {
    class: "cls-18",
    points: [
      [25, 75],
      [58, 80],
      [38, 93],
      [25, 75],
    ],
  },
  {
    class: "cls-12",
    points: [
      [17, 83],
      [38, 93],
      [25, 75],
      [17, 83],
    ],
  },
  {
    class: "cls-2",
    points: [
      [17, 83],
      [3, 61],
      [25, 75],
      [17, 83],
    ],
  },
  {
    class: "cls-21",
    points: [
      [25, 75],
      [18, 45],
      [3, 61],
      [25, 75],
    ],
  },
  {
    class: "cls-3",
    points: [
      [18, 45],
      [5, 35],
      [3, 61],
      [18, 45],
    ],
  },
  {
    class: "cls-7",
    points: [
      [5, 35],
      [18, 45],
      [23, 16],
      [5, 35],
    ],
  },
  {
    class: "cls-10",
    points: [
      [5, 35],
      [19, 14],
      [23, 16],
      [5, 35],
    ],
  },
  {
    class: "cls-19",
    points: [
      [35, 5],
      [23, 16],
      [19, 14],
      [35, 5],
    ],
  },
  {
    class: "cls-9",
    points: [
      [35, 5],
      [23, 16],
      [50, 8],
      [35, 5],
    ],
  },
  {
    class: "cls-30",
    points: [
      [23, 16],
      [50, 8],
      [45, 28],
      [23, 16],
    ],
  },
  {
    class: "cls-31",
    points: [
      [50, 8],
      [72, 19],
      [45, 28],
      [50, 8],
    ],
  },
  {
    class: "cls-25",
    points: [
      [72, 19],
      [88, 42],
      [72, 51],
      [72, 19],
    ],
  },
  {
    class: "cls-26",
    points: [
      [88, 42],
      [84, 68],
      [72, 51],
      [88, 42],
    ],
  },
  {
    class: "cls-1",
    points: [
      [72, 51],
      [84, 68],
      [58, 80],
      [72, 51],
    ],
  },
  {
    class: "cls-27",
    points: [
      [45, 57],
      [58, 80],
      [72, 51],
      [45, 57],
    ],
  },
  {
    class: "cls-16",
    points: [
      [45, 57],
      [25, 75],
      [58, 80],
      [45, 57],
    ],
  },
  {
    class: "cls-22",
    points: [
      [45, 57],
      [25, 75],
      [18, 45],
      [45, 57],
    ],
  },
  {
    class: "cls-17",
    points: [
      [45, 28],
      [23, 16],
      [18, 45],
      [45, 28],
    ],
  },
  {
    class: "cls-29",
    points: [
      [45, 57],
      [72, 51],
      [45, 28],
      [45, 57],
    ],
  },
  {
    class: "cls-11",
    points: [
      [72, 19],
      [72, 51],
      [45, 28],
      [72, 19],
    ],
  },
  {
    class: "cls-8",
    points: [
      [45, 28],
      [18, 45],
      [45, 57],
      [45, 28],
    ],
  },
];
const ogColors = {
  "cls-1": "#cc9295",
  "cls-2": "#360750",
  "cls-3": "#3d3887",
  "cls-4": "#BDDAE0",
  "cls-5": "#f1d9ae",
  "cls-6": "#9CCEFF",
  "cls-7": "#5369b1",
  "cls-8": "#847ab2",
  "cls-9": "#638DE2",
  "cls-10": "#26559a",
  "cls-11": "#c2b1c6",
  "cls-12": "#54092f",
  "cls-13": "#a24348",
  "cls-14": "#e7e5cb",
  "cls-15": "#eeb375",
  "cls-16": "#a15f87",
  "cls-17": "#7888c3",
  "cls-18": "#914661",
  "cls-19": "#125c9d",
  "cls-20": "#c68562",
  "cls-21": "#604089",
  "cls-22": "#7c659c",
  "cls-23": "#eec191",
  "cls-24": "#cd766e",
  "cls-25": "#d5bfbf",
  "cls-26": "#deaea5",
  "cls-27": "#ba8c9f",
  "cls-28": "#def5ea",
  "cls-29": "#b69bb8",
  "cls-30": "#82a1d4",
  "cls-31": "#AEC2DB",
};
export { ChiqueLogo };
