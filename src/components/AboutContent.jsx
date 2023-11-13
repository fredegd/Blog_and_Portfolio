import { Box, Typography, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { client } from "../client";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

import TechStacks from "./TechStacks";

import PageTitle from "./PageTitle";

import anime from "animejs";

const personalInfo = {
  short:
    "I'm Full stack Web developer with a passion for creating beautiful, functional, and responsive web applications. I love experimenting in the realm of Creative Coding and Graphic Design and Animation",
  full: [
    "I'm Full stack developer with a passion for creating beautiful, functional, and responsive web applications.",
    "I also like experimenting in the fields of Creative Coding and Graphic Design",
    "Lifelong learner,  Always looking for new ways to improve my skills and expand my experience.",
    "This year I attended full-time a coding Bootcamp, Successfully graduate at it and improved my knowledge and skills in the field of Software Development.",
    "Currently i am looking for a full time position as a Frontend engineer.",
    "Fun fact: I began by chance as a self-taught developer, have been coding for past 2+ years now.",
  ],
};
export default function AboutContent() {
  const theme = useTheme();
  const location = useLocation();
  const [gridSize, setGridSize] = useState({ numRows: 11, numCols: 1 });
  const [aboutImage, setAboutImage] = useState();
  const [aboutImageAlt, setAboutImageAlt] = useState();

  useEffect(() => {
    client
      .getEntry(import.meta.env.VITE_ABOUT_IMAGE_ID)
      .then((response) => {
        console.log(response);
        setAboutImage(response.fields.authorImg.fields.file.url);
        setAboutImageAlt(response.fields.authorImgAlt.fields.file.url);
      })
      .catch((err) => console.log(err));
  }, []);

  const divArray = Array.from(
    { length: gridSize.numRows },
    (_, index) => index + 1
  );

  window.scrollTo(0, 0);

  const maxWidth = 45;
  const maxHeight = (maxWidth * 1.5) / gridSize.numRows;

  const target = document.querySelector(".tile-wrap");

  const handleOn = (entry) => {
    anime({
      targets: ".tile",
      rotate: anime.stagger([-3, 3]), // rotation will be distributed from -360deg to 360deg evenly between all elements
      translateX: [0, "12vw", "-85vw"],

      opacity: [1, 0.5],
      duration: (gridSize.numRows + 1) * 100,
      delay: anime.stagger(100, { direction: "reverse" }),
      easing: "easeOutElastic(1, .8)",
      direction: "reverse",
    });
    const arr = Array.from(entry.target.children).map((item) => {
      item.classList.remove("tile");
      // console.log("removed");
    });
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

  const fadeOutOnScroll = (element, distance) => {
    if (!element) {
      return;
    }
    let distanceToTop = element.getBoundingClientRect().top;
    let elementHeight = element.getBoundingClientRect().height;
    let scrollTop = document.documentElement.scrollTop;
    // console.log(distanceToTop, elementHeight, scrollTop);

    let opacity = 1;
    if (
      scrollTop > distanceToTop + distance &&
      location.pathname === "/about"
    ) {
      opacity = 1 - (scrollTop - distanceToTop) / elementHeight;
    }

    return opacity;
  };

  function scrollHandler() {
    fadeOutOnScroll(target, 80);
  }

  window.addEventListener("scroll", scrollHandler);

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
          padding: { xs: "2rem", md: "2.5rem" },
          paddingBottom: { xs: "5rem", md: "2.5rem" },
          paddingX: { sm:"3rem", md: "5rem", lg: "10rem"},

          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: { xs: "center", sm: "flex-start" },
          gap: "2rem",
          justifyContent: "space-between",
          width: "100%",

          background: {
            xs: `linear-gradient(90deg, #00000000 0%,${theme.palette.background.transparent} 8%, ${theme.palette.background.main} 20%, ${theme.palette.background.main} 80%, ${theme.palette.background.transparent} 92%,  #00000000 100%)`,
            lg: `linear-gradient(90deg, #00000000 0%, ${theme.palette.background.main} 25%, ${theme.palette.background.main}ee 70%, ${theme.palette.background.transparent} 92%,  #00000000 100%)`,
            xl: `linear-gradient(90deg, #00000000 0%, ${theme.palette.background.main} 25%, ${theme.palette.background.main}ee 70%, ${theme.palette.background.transparent} 92%,  #00000000 100%)`,
          },
        }}
      >
        {location.pathname === "/about" && (
          <Box
            className="tile-wrap"
            sx={{
              top: "5rem",
              opacity: { xs: fadeOutOnScroll(), md: 1 },
            }}
          >
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
                      xs: ` ${-maxWidth * 1.8}vw ${bgY * 1.8}vw`,
                      sm: ` ${-maxWidth * 0.9}vw ${bgY * 0.9}vw`,
                      lg: ` ${-maxWidth * 0.65}vw ${bgY * 0.65}vw`,
                    },
                    filter: "brightness(130%)",
                    backgroundSize: { xs: "100% auto", sm: "100% auto" },
                    backgroundRepeat: "noRepeat",
                    width: {
                      xs: `${maxWidth * 1.8}vw`,
                      sm: `${maxWidth * 0.9}vw`,
                      lg: `${maxWidth * 0.65}vw`,
                    },
                    height: {
                      xs: `${maxHeight * 1.8}vw`,
                      sm: `${maxHeight * 0.9}vw`,
                      lg: `${maxHeight * 0.65}vw`,
                    },
                    "&:hover": {
                      background: `url(${aboutImageAlt})`,
                      backgroundPosition: {
                        xs: ` ${-maxWidth * 1.8}vw ${bgY * 1.8}vw`,
                        sm: ` ${-maxWidth * 0.9}vw ${bgY * 0.9}vw`,
                        lg: ` ${-maxWidth * 0.65}vw ${bgY * 0.65}vw`,
                      },
                      filter: "brightness(130%)",
                      backgroundRepeat: "noRepeat",
                      backgroundSize: {
                        xs: `100% ${101 * divArray.length}%`,
                        sm: `100% ${101 * divArray.length}%`,
                      },
                      width: {
                        xs: `${maxWidth * 1.8}vw`,
                        sm: `${maxWidth * 0.9}vw`,
                        lg: `${maxWidth * 0.65}vw`,
                      },
                      height: {
                        xs: `${maxHeight * 1.8}vw`,
                        sm: `${maxHeight * 0.9}vw`,
                        lg: `${maxHeight * 0.65}vw`,
                      },
                    },
                  }}
                ></Box>
              );
            })}
          </Box>
        )}

        {location.pathname === "/" && (
          <Box
            sx={{
              top: "5rem",
            }}
          >
            <Box
              sx={{
                position: "relative",
                background: `url(${aboutImageAlt})`,
                backgroundSize: { xs: "100% auto", sm: "100% auto" },
                backgroundRepeat: "noRepeat",
                width: {
                  xs: `${maxWidth * 1.8}vw`,
                  sm: `${maxWidth * 0.9}vw`,
                  lg: `${maxWidth * 0.65}vw`,
                },
                height: {
                  xs: `${maxHeight * 1.8 * gridSize.numRows}vw`,
                  sm: `${maxHeight * 0.9 * gridSize.numRows}vw`,
                  lg: `${maxHeight * 0.65 * gridSize.numRows}vw`,
                },
                transition: "all 0.65s ease-in-out",
                "&:hover": {
                  background: `url(${aboutImage})`,
                  backgroundSize: { xs: "100% auto", sm: "100% auto" },
                  backgroundRepeat: "noRepeat",
                  width: {
                    xs: `${maxWidth * 1.8}vw`,
                    sm: `${maxWidth * 0.9}vw`,
                    lg: `${maxWidth * 0.65}vw`,
                  },
                  height: {
                    xs: `${maxHeight * 1.8 * gridSize.numRows}vw`,
                    sm: `${maxHeight * 0.9 * gridSize.numRows}vw`,
                    lg: `${maxHeight * 0.65 * gridSize.numRows}vw`,
                  },
                },
              }}
            ></Box>
          </Box>
        )}
        <Box className="tile">
          {location.pathname === "/about" && (
            <>
              {" "}
              <Typography
                variant="p"
                color={theme.palette.text.primary}
                sx={{
                  fontSize: {
                    xs: "1.0rem",
                    sm: "1.0rem",
                    md: "1.2rem",
                    textAlign: "justify",
                  },
                }}
              >
                {personalInfo.full.map((item, index) => {
                  return (
                    <Box
                      key={index}
                      sx={{ display: "flex", flexDirection: "column" }}
                    >
                      <Typography
                        sx={{ fontSize: "inherit", marginY: "0.5rem" }}
                      >
                        {item}
                      </Typography>
                    </Box>
                  );
                })}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  alignItems: "flex-start",
                  justifyContent: { xs: "flex-start", md: "space-between" },
                  width: "90%",
                  zIndex: "1000",
                }}
              >
                <Link to={"/works"}>
                  <Button
                    sx={{
                      marginTop: "2rem",
                      border: `2px solid ${theme.palette.text.highlight}`,
                      borderRadius: "2rem",
                      // width: { xs: "17rem", sm: "13rem" , md:"11rem"},
                      fontSize: { xs: "1.2rem", sm: "1.0rem" },

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
                      // width: { xs: "17rem", sm: "13rem" , md:"11rem"},
                      fontSize: { xs: "1.2rem", sm: "1.0rem" },
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
            <Typography
              variant="p"
              color={theme.palette.text.primary}
              sx={{
                fontSize: {
                  xs: "1.2rem",
                  sm: "1.2rem",
                  md: "1.5rem",
                  textAlign: "justify",
                },
              }}
            >
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
      </Box>
      <TechStacks />
    </Box>
  );
}
