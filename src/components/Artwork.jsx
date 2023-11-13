import React, { useEffect, useRef, useState } from "react";
import Button from "@mui/material/Button";
import Slider from "@mui/material/Slider";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Switch from "@mui/material/Switch";

import { useDarkMode } from "../context/DarkModeContext.jsx";
import { useTheme } from "@mui/material/styles";
import { colorsToChooseFrom } from "../colorsToChooseFrom.js";

import { signal, effect } from "@preact/signals-react";

//
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
  console.log(color, " was chosen");

  return color;
};

const svgWidth = 300;
const svgHeight = 300;
const startString = `<svg xmlns="http://www.w3.org/2000/svg" width="${svgWidth}" height="${svgHeight}">`;
const endString = "</svg>";

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

  const toggleStaticBg = () => {
    setStaticBg((prev) => (prev = event.target.checked));
    localStorage.setItem("staticBg", !staticBg); // Save staticBg on LS
  };

  //bg color according to the theme dark or light
  const [bgColor, setBgColor] = useState(theme.palette.background.main);
  //
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

  const [maxSegmentAmount, setMaxSegmentAmount] = useState(
    gridSize > 2 ? Math.floor(gridSize * gridSize * 0.5) + gridSize : 2
  );

  const svgData = localStorage.getItem("svgData");

  const extractStrokesFromSVG = () => {
    const regex = /<line [^>]*\/>/g;
    if (svgData) {
      // console.log("bgImage passed to extractStrokesFromSVG");
      const matches = svgData.match(regex);
      if (matches) {
        const strokes = matches.join("");
        return strokes;
      }
    } else {
      console.log("no bgImage");
    }
  };

  const drawStrokes = () => {
    const pointSize = svgWidth / (gridSize - 1);

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

    console.log("new strokesString");

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

    localStorage.setItem("svgData", svgDataString);
    setBgImage(svgDataString);
  }, [dk, strokesString]);

  //this function is called when the component is mounted and it checks if there is a bgImage in local storage
  //if there is one,  sets the bgImage state to the value in local storage
  useEffect(() => {
    const svgData = localStorage.getItem("svgData");

    if (svgData) {
      // console.log(svgData)
      setBgImage(svgData);
    }
  }, [bgImage, color1, color2, gridSize, segmentsAmount, bgColor]);

  const saveDataLocally = (svgData) => {
    try {
      // Store the SVG data in localStorage
      localStorage.setItem("bgColor", bgColor); // Save bgColor
      localStorage.setItem("col1", color1); // Save col1
      localStorage.setItem("col2", color2); // Save col2
      localStorage.setItem("gridSize", gridSize); // Save gridSize
      localStorage.setItem("segmentsAmount", segmentsAmount); // Save segmentsAmount
      localStorage.setItem("svgData", svgData);
      console.log("SVG data saved locally.");
    } catch (error) {
      console.error("Error while saving SVG data locally:", error);
    }
  };

  const handleDrawAndStore = () => {
    console.log("getting a call", bgString);
    let newStrokesString = drawStrokes();
    setStrokesString(newStrokesString);
    let svgString = startString + bgString + newStrokesString + endString;
    saveDataLocally(svgString);
    setBgImage(svgString);
  };

  const handleColorChange = (colorKey, setter) => {
    const newColor = getRandomHexColor(colorKey);
    console.log(newColor);
    setter(newColor);
    localStorage.setItem(colorKey, newColor);
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
          height: "10vh",
        }}
      >
        <Box sx={{ width: 300 }}>
          <Box onClick={handleDrawAndStore}>
            <Typography variant="p" sx={{ fontSize: { xs: 16, md: 18 }, fontWeight:"bold" }}>
              {" "}
              Tap to Generate a new Background Pattern
            </Typography>

            {/* an element displaying the content of bgImage */}

            <Box
              sx={{
                width: "300px",
                height: "300px",
                backgroundImage: `url(data:image/svg+xml;base64,${btoa(
                  bgImage
                )})`,
                backgroundRepeat: "no-repeat",
              }}
            ></Box>
          </Box>
        </Box>

        <Box sx={{ width: 300 }}>
          <Box sx={{ mt: "1rem", alignSelf: "center" }}>
            <Typography
              sx={{
                height: "3rem",
                width: 300,
                // border: `2px solid ${theme.palette.text.primary}`,
                // borderRadius: "1.5rem",
                // display: "flex",
                // alignItems: "flex-start",
                // justifyContent: "center",
              
              }}
            >
              { "static BG"}
              <Switch
              checked={staticBg}
              onChange={toggleStaticBg}
              inputProps={{ "aria-label": "controlled" }}
            />
            </Typography>
            
          </Box>
        </Box>

        <Box sx={{ width: 300 }}>
          <Typography variant="p" sx={{ fontSize: { xs: 16, md: 18 } }}>
            Matrix Size: {gridSize}x{gridSize}
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
          <Typography variant="p" sx={{ fontSize: { xs: 16, md: 18 } }}>
            Segment Amount: {segmentsAmount}
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

        <Box
          sx={{ width: 300, mt: "1rem", display: "flex", flexDirection: "row" }}
        >
          <Typography
            onClick={() => handleColorChange("col1", setColor1)}
            sx={{
              height: "3rem",
              width: "8rem",
              background: `${color1}`,
              mx: "1rem",
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
              height: "3rem",
              width: "8rem",
              background: `${color2}`,
              mx: "1rem",
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
