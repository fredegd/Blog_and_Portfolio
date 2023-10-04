import { Box, Typography, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useState, useEffect } from "react";

import Pic from "../assets/portrait.gif";

import anime from "animejs";

export default function About() {
  const theme = useTheme();
  const [gridSize, setGridSize] = useState({ numRows: 15, numCols: 1 });
  const [aboutImage, setAboutImage] = useState(Pic);

  const divArray = Array.from(
    { length: gridSize.numRows },
    (_, index) => index + 1
  );

  const maxWidth = 30;
  const maxHeight = 45 / gridSize.numRows;

  const target = document.querySelector(".tile-wrap");

  const handleOn = (entry) => {
    anime({
      targets: ".tile",
      rotate: anime.stagger([-3, 3]), // rotation will be distributed from -360deg to 360deg evenly between all elements
      translateX: [0, "12vw", "-85vw"],

      // keyframes: [
      //   {translateX: "-100vw"},
      // ],
      opacity: [1, 0.5],
      duration: (gridSize.numRows + 1) * 100,

      // delay: function (entry, i) {
      //   return i * 100;
      // },

      delay: anime.stagger(100, { direction: "reverse" }),
      easing: "easeOutElastic(1, .8)",
      direction: "reverse",
    });
    const arr = Array.from(entry.target.children).map((item) => {
      item.classList.remove("tile");
      console.log("removed");
    });

    console.log(entry.target.children);
    observer.unobserve(target);
    entry.target.classList.remove("tile-wrap");
  };

  function handleIntersection(entries) {
    // The callback will return an array of entries, even if you are only observing a single item
    entries.map((entry) => {
      if (entry.isIntersecting) {
        handleOn(entry);
        console.log("intersecting");
      } else {
        console.log("not intersecting");
      }
    });
  }

  const observer = new IntersectionObserver(handleIntersection);

  target && observer.observe(target);

  return (
    <Box
      id="about"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        width: "100%",
        minHeight: "100vh",
        overflow: "scroll",
      }}
    >
      {" "}
      <Box
        sx={{
          backgroundColor: `${theme.palette.text.highlight}88`,
          fontSize: "20px",
          color: theme.palette.text.primary,
          width: "100%",
          padding: "2.5rem",
          marginY: "5rem",
          zIndex: "1000",
        }}
      >
        <Typography variant="h1">About Me:</Typography>
      </Box>
      <Box
        sx={{
          zIndex: "1000",
          padding: "2.5rem",
          display: "flex",
          flexDirection: { xs: "column-reverse", md: "row" },
          alignItems: "center",
          width: "100%",
          overflow: "scroll",
          // border: "1px solid black",

          backgroundColor: `${theme.palette.background.main}`,
        }}
      >
        <Box className="tile" sx={{ padding: "2.5rem" }}>
          <Typography
            variant="p"
            color={theme.palette.text.primary}
          ></Typography>
          I am a passionate Full-Stack Web and App Developer experimenting in
          the realm of Creative Coding and Graphic Design as well as Front end
          development.
          <br />
          <br />
         began by chance as a self-taught developer, have been coding for past
          2+ years now. 
          And as the crush for knowledge grew, I decided to attend a coding bootcamp where i could further widen my knowledge and skills.
          My experience range over a wide variety of languages and frameworks,
          including:
          <br />
          <br />
          
            <span>React, </span>
            <span>Node.js, </span>
            <span>Express, </span>
            <span>Java, </span>
            <span>JavaScript, </span>
            <span>HTML, </span>
            <span>CSS, </span>
            <span>SQL, </span>
            <span>MongoDB, </span>
            <span>Git, </span>
            <span>REST, </span>

            <span>GraphQL, </span>
            <span>Adobe Illustrator, </span>
            <span>Adobe Photoshop, </span>
            <span>Figma, </span>
            <span>Adobe XD, </span>

        </Box>
        <Box className="tile-wrap">
          {divArray.map((item) => {
            const bgY = -maxHeight * item + maxHeight;

            return (
              <Box
                className="tile"
                key={item}
                sx={{
                  position: "relative",

                  background: `url(${aboutImage})`,
                  backgroundPosition: {
                    xs: ` ${-maxWidth * 2}vw ${bgY * 2}vw`,
                    md: ` ${-maxWidth}vw ${bgY}vw`,
                  },
                  filter: "brightness(130%)",
                  backgroundSize: { xs: "100% auto", md: "100% auto" },
                  backgroundRepeat: "noRepeat",
                  width: { xs: `${maxWidth * 2}vw`, md: `${maxWidth}vw` },
                  height: { xs: `${maxHeight * 2}vw`, md: `${maxHeight}vw` },
                  // border: "1px solid black",
                  // transition: "0.1s ease-out",
                  // animation: `${slideIn1} 1.7s ease-out ${item.id * 0.1}s 1`,
                }}
              ></Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
}
