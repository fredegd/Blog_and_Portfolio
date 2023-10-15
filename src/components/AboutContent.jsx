import { Box, Typography, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { client } from "../client";

import PageTitle from "./PageTitle";

import Pic from "../assets/portrait.gif";

import anime from "animejs";

const personalInfo = {
  short:
    "I'm a full stack developer with a passion for creating beautiful, functional, and responsive web applications. I love experimenting in the realm of Creative Coding and Graphic Design\n",
  full: "I'm a full stack developer with a passion for creating beautiful, functional, and responsive web applications. I love experimenting in the realm of Creative Coding and Graphic Design,  I'm a lifelong learner and I'm always looking for new ways to improve my skills and expand my knowledge. I'm currently looking for a full time position as a software engineer. I began by chance as a self-taught developer, have been coding for past 2+ years now. And as the crush for knowledge grew, I decided to attend a coding bootcamp where i could further widen my knowledge \n and skills. My experience range over a wide variety of languages and frameworks, including: \n React, Node.js, Express, Java, JavaScript, HTML, CSS, SQL, MongoDB, Git, REST, GraphQL, Adobe Illustrator, Adobe Photoshop, Figma, Adobe XD",
};
export default function AboutContent() {
  const theme = useTheme();
  const location = useLocation();

  const [gridSize, setGridSize] = useState({ numRows: 15, numCols: 1 });
  const [aboutImage, setAboutImage] = useState();

  useEffect(() => {
    client
      .getEntry("10THe99sOMrQYp3NyoDCID")
      .then((response) => {
        console.log(response);
        setAboutImage(response.fields.authorImg.fields.file.url);
      })
      .catch((err) => console.log(err));
  }, []);

  const divArray = Array.from(
    { length: gridSize.numRows },
    (_, index) => index + 1
  );

  window.scrollTo(0, 0);

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
        console.log("intersecting");
        handleOn(entry);
      } else {
        console.log("not intersecting");
      }
    });
  }

  const observer = new IntersectionObserver(handleIntersection);

  target && observer.observe(target);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        // border: "1px solid black",
        zIndex: "1000",
      }}
    >
      <PageTitle title={"ABOUT ME:"} />
      <Box
        id="aboutContent"
        sx={{
          zIndex: "1000",
          padding: {xs:"0.5rem",md:"2.5rem"},
          display: "flex",
          flexDirection: { xs: "column-reverse", lg: "row" },
          alignItems: "center",
          width: "100%",
          // overflow: "scroll",
          // border: "1px solid black",

          background: {
            xs: `linear-gradient(90deg, #00000000 0%,${theme.palette.background.transparent} 5%, ${theme.palette.background.main} 20%, ${theme.palette.background.main} 80%, ${theme.palette.background.transparent} 95%,  #00000000 100%)`,
            lg: `linear-gradient(90deg, #00000000 0%,${theme.palette.background.transparent} 15%, ${theme.palette.background.main} 30%, ${theme.palette.background.main} 70%, ${theme.palette.background.transparent} 85%,  #00000000 100%)`,
          },
        }}
      >
        <Box className="tile" sx={{  textAlign: "justify" }}>
          {location.pathname === "/about" && (
            <>
              {" "}
              <Typography variant="p" color={theme.palette.text.primary}>
                {personalInfo.full}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row",xl:"column" },
                  justifyContent: { xs: "flex-start", md: "space-between" },
                  width: "90%",
                }}
              >
                <Link to={"/projects"}>
                  <Button
                    sx={{
                      marginTop: "2rem",
                      border: `2px solid ${theme.palette.text.highlight}`,
                      borderRadius: "2rem",
                      width: { xs: "17rem", sm: "17rem" },

                      transition: "all 0.3s ease-in-out",
                      "&:hover": {
                        background: `${theme.palette.text.highlight}88`,

                        transform: "translateX(2.5rem)",
                      },
                    }}
                  >
                    Latest Projects →
                  </Button>
                </Link>
                <br />
                <Link to={"/contact"}>
                  <Button
                    sx={{
                      marginTop: "2rem",
                      border: `2px solid ${theme.palette.text.highlightAlt}`,
                      borderRadius: "2rem",
                      width: { xs: "17rem", sm: "15rem" },
                      transition: "all 0.3s ease-in-out",
                      "&:hover": {
                        background: `${theme.palette.text.highlightAlt}88`,

                        transform: "translateX(2.5rem)",
                      },
                    }}
                  >
                    Get in Touch →
                  </Button>
                </Link>
              </Box>
            </>
          )}
          {location.pathname === "/" && (
            <Typography variant="p" color={theme.palette.text.primary}>
              {
                <>
                  {personalInfo.short}
                  <Link to={"/about"}>
                    <Button>...more</Button>
                  </Link>
                </>
              }
            </Typography>
          )}
        </Box>
        <Box className="tile-wrap">
          {divArray.map((item) => {
            const bgY = -maxHeight * item + maxHeight;

            return (
              <Box
                className="tile"
                key={item}
                sx={{
                  ":before": {
                    opacity: "0",
                  },
                  position: "relative",
                  // opacity: "0",
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
                }}
              ></Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
}
