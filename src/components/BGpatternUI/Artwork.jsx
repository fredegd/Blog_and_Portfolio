import React, { useEffect, useRef, useState } from "react";
import Slider from "@mui/material/Slider";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {CustomSwitch} from "./CustomSwitch";

import { useDarkMode } from "../../context/DarkModeContext.jsx";
import { useTheme } from "@mui/material/styles";
import { colorsToChooseFrom } from "../../colorsToChooseFrom.js";

const svgWidth = 300;
const svgHeight = 300;
const startString = `<svg xmlns="http://www.w3.org/2000/svg" width="${svgWidth}" height="${svgHeight}">`;
const endString = "</svg>";

//a function to choose from a list of colors
const getRandomHexColor = (colName) => {
  //a variation to generate Hex colors
  // const hexChars = "0123456789abcdef";
  // let color = "#";
  // for (let i = 0; i < 6; i++) {
  //   const randomIndex = Math.floor(Math.random() * hexChars.length);
  //   color += hexChars[randomIndex];
  // }
  const randomIndex = Math.floor(Math.random() * colorsToChooseFrom.length);
  const color = colorsToChooseFrom[randomIndex].value;
  localStorage.setItem(colName, color);
  // console.log(color, " was chosen");

  return color;
};

export default function Artwork({
  bgImage,
  setBgImage,
  color1,
  color2,
  setColor1,
  setColor2,
  staticBg,
  setStaticBg,
}) {
  const theme = useTheme();
  const dk = useDarkMode();

  //bg color according to the theme dark or light
  const [bgColor, setBgColor] = useState(theme.palette.background.main);
  // a string to build a backround rectangle
  const [bgString, setBgString] = useState(
    `<rect width="${svgWidth}" height="${svgHeight}" fill="${bgColor}"/>`
  );

  // Initial gridSize
  const [gridSize, setGridSize] = useState(
    localStorage.getItem("gridSize")
      ? parseInt(localStorage.getItem("gridSize"))
      : 4
  );
  // Initial segmentsAmount
  const [segmentsAmount, setSegmentAmount] = useState(
    localStorage.getItem("segmentsAmount")
      ? parseInt(localStorage.getItem("segmentsAmount"))
      : 7
  );
  // a max amount of segments according to each grid size is calculated
  const [maxSegmentAmount, setMaxSegmentAmount] = useState(
    gridSize > 2 ? Math.floor(gridSize * gridSize * 0.5) + gridSize : 2
  );
  //check is there is some SVGdata in local storage
  const svgData = localStorage.getItem("svgData");

  const toggleStaticBg = () => {
    setStaticBg((prev) => (prev = event.target.checked));
    localStorage.setItem("staticBg", !staticBg); // Save staticBg on LS
  };

  const extractStrokesFromSVG = () => {
    const regex = /<line [^>]*\/>/g;
    if (svgData) {
      const matches = svgData.match(regex);
      if (matches) {
        const strokes = matches.join("");
        return strokes;
      }
    } else {
      // console.log("no bgImage");
    }
  };

  const drawStrokes = () => {
    const pointSize = svgWidth / (gridSize - 1);
    // console.log(color1, color2);
    let tempString = "";
    for (let i = 0; i < 2; i++) {
      const col = i % 2 === 0 ? color1 : color2;

      let startIndex = Math.floor(Math.random() * gridSize ** 2);
      let currentIndex = startIndex;
      const visitedPoints = new Set();

      for (let j = 0; j < segmentsAmount; j++) {
        const startX =
          (currentIndex % gridSize) * pointSize * 0.8 + svgWidth * 0.1;
        const startY =
          Math.floor(currentIndex / gridSize) * pointSize * 0.8 +
          svgWidth * 0.1;

        visitedPoints.add(currentIndex);

        let nextIndex;
        do {
          nextIndex =
            (currentIndex +
              // Math.floor(Math.random() * (gridSize ** 2 - 2)) +
              Math.floor(Math.random() * gridSize ** gridSize)) %
            gridSize ** 2;
        } while (visitedPoints.has(nextIndex));

        const endX = (nextIndex % gridSize) * pointSize * 0.8 + svgWidth * 0.1;
        const endY =
          Math.floor(nextIndex / gridSize) * pointSize * 0.8 + svgWidth * 0.1;
        let sw = Math.random() * 2 + 6;
        // let sw = Math.random() * 5+5;

        currentIndex = nextIndex;

        tempString += `<line x1="${startX}" y1="${startY}" x2="${endX}" y2="${endY}" stroke="${
          col + "ff"
        }" stroke-width="${sw}" stroke-linecap="round"/>`;
      }
    }

    // console.log("new strokesString");

    return tempString;
  };

  const [strokesString, setStrokesString] = useState(
    bgImage ? extractStrokesFromSVG() : drawStrokes()
  );

  useEffect(() => {
    const svgDataString =
      startString +
      `<rect width="${svgWidth}" height="${svgHeight}" fill="${theme.palette.background.main}"/>` +
      strokesString +
      endString;

    localStorage.setItem("bgColor", theme.palette.background.main); // Save bgColor
    setBgColor(theme.palette.background.main);

    setBgString(
      `<rect width="${svgWidth}" height="${svgHeight}" fill="${theme.palette.background.main}"/>`
    );
    // console.log("executing useEffect");
    localStorage.setItem("svgData", svgDataString);
    setBgImage((prev) => (prev = svgDataString));
  }, [dk, strokesString]);

  //this useEffect is called when the component is mounted and it checks if there is a bgImage in local storage
  //if there is one,  sets the bgImage state like the value in local storage
  useEffect(() => {
    const svgData = localStorage.getItem("svgData");
    if (svgData) {
      setBgImage((prev) => (prev = svgData));
    }
  }, [bgImage, color1, color2, gridSize, segmentsAmount, bgColor]);

  const handleDrawAndStore = () => {
    let newStrokesString = drawStrokes();
    setStrokesString((prev) => (prev = newStrokesString));
    let svgString = startString + bgString + newStrokesString + endString;
    setBgImage(svgString);
    saveDataLocally(svgString);
  };

  const saveDataLocally = (svgData) => {
    {
      // Store the SVG data in localStorage
      localStorage.setItem("bgColor", bgColor); // Save bgColor
      localStorage.setItem("col1", color1); // Save col1
      localStorage.setItem("col2", color2); // Save col2
      localStorage.setItem("gridSize", gridSize); // Save gridSize
      localStorage.setItem("segmentsAmount", segmentsAmount); // Save segmentsAmount
      localStorage.setItem("svgData", svgData);
      // console.log("SVG data saved locally.");
    }
  };

  const handleColorChange = (colorKey, setter) => {
    const newColor = getRandomHexColor(colorKey);
    // console.log(newColor);
    setter((prev) => (prev = newColor));
    // console.log(colorKey, newColor);
    localStorage.setItem(colorKey, newColor);
    //this is a bug and need to be fixed
    // handleDrawAndStore();
  };

  const handleGridSizeChange = (event, newValue) => {
    setGridSize(newValue);
    localStorage.setItem("gridSize", newValue); // Save gridSize

    setMaxSegmentAmount(
      newValue > 2 ? Math.floor(newValue * newValue * 0.5 + newValue) : 2
    );
    const newAmountOfStrokes = Math.min(
      newValue > 2 ? Math.floor(newValue * newValue * 0.5 + newValue) : 2,
      segmentsAmount
    );
    // console.log(newAmountOfStrokes);

    setSegmentAmount(newAmountOfStrokes);
    localStorage.setItem("segmentsAmount", newAmountOfStrokes); // Save segmentsAmount
  };

  const handleNumStrokesChange = (event, newValue) => {
    setSegmentAmount(newValue);
    localStorage.setItem("segmentsAmount", newValue); // Save segmentsAmount
  };

  const handleHardSave = () => {
    const svgData = localStorage.getItem("svgData");
    if (!svgData) {
      console.error("SVG data not found in local storage.");
      return;
    }

    // Create a Blob from the local stored SVG data
    const blob = new Blob([svgData], { type: "image/svg+xml" });

    // Create a download link
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);

    // Set the file name for the download
    a.download = "stored_artwork.svg";

    // Programmatically trigger the download
    a.click();
  };

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: { xs: "100%", sm: 300 },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          {/* an element displaying the content of bgImage */}

          <Box
            sx={{
              width: { xs: "250px", md: "300px" },
              height: { xs: "250px", md: "300px" },
              backgroundImage: `url(data:image/svg+xml;base64,${btoa(
                bgImage
              )})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "contain",
            }}
            onClick={handleDrawAndStore}
          ></Box>

          <Box
            sx={{
              width: { xs: 250, md: 300 },
              mt: "0.5rem",
              display: "flex",
              // flexDirection: { xs: "column", sm: "row" },
              gap: "1rem",
              justifyContent: "space-between",
            }}
          >
            <Typography
              onClick={() => {
                handleColorChange("col1", setColor1);
              }}
              sx={{
                height: "2.5rem",
                width: { xs: "100px", sm: "120px" },
                background: `${color1}`,
                fontSize: { xs: 20 },
                fontWeight: "bold",
                borderRadius: "1.5rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                "&:hover": {
                  cursor: "pointer",
                },
              }}
            >
              Color 1
            </Typography>
            {color1 === color2 ? "=" : ""}
            <Typography
              onClick={() => handleColorChange("col2", setColor2)}
              sx={{
                height: "2.5rem",
                width: { xs: "100px", sm: "120px" },
                background: `${color2}`,
                fontSize: { xs: 20 },
                fontWeight: "bold",
                borderRadius: "1.5rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                "&:hover": {
                  cursor: "pointer",
                },
              }}
            >
              Color 2
            </Typography>
          </Box>
        </Box>

        <Box sx={{ width: 300 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mt: "1rem",
              alignSelf: "center",
            }}
          >
            <Typography
              sx={{
                height: "3rem",
                fontSize: { xs: "18px", md: "18px" },
              }}
            >
              {"static BG"}
            </Typography>
            <Box>

            {staticBg ? "ON" : "OFF"  }
            <CustomSwitch checked={staticBg} onChange={toggleStaticBg} />
            </Box>
          </Box>
        </Box>

        <Box sx={{ width: 300 }}>
          <Typography
            variant="p"
            sx={{
              fontSize: { xs: "18px", md: "18px" },
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            {"Matrix Size: "}
            <strong>
              {gridSize - 1}x{gridSize - 1}
            </strong>
          </Typography>
          <Slider
            aria-label="gridSize"
            value={gridSize}
            valueLabelDisplay="auto"
            step={1}
            marks
            min={2}
            max={5}
            onChange={handleGridSizeChange}
          />
        </Box>

        <Box sx={{ width: 300, my: "-0.5rem" }}>
          <Typography
            variant="p"
            sx={{
              fontSize: { xs: 18, md: 18 },
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            {"Segment Amount: "}
            <strong>{segmentsAmount}</strong>
          </Typography>
          <Slider
            aria-label="segmentsAmount"
            value={segmentsAmount}
            valueLabelDisplay="auto"
            step={1}
            marks
            min={2}
            max={maxSegmentAmount}
            onChange={handleNumStrokesChange}
          />
        </Box>

        <Box sx={{ mt: "1rem" }}>
          <Typography
            onClick={handleHardSave}
            sx={{
              height: "3rem",
              width: "8rem",
              border: `2px solid ${theme.palette.text.primary}`,
              borderRadius: "1.5rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              "&:hover": {
                cursor: "pointer",
              },
            }}
          >
            save SVG
          </Typography>
        </Box>
      </Box>
    </div>
  );
}
