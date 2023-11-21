import { Box, Typography, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { contentfulClient } from "../../utils/contentfulClient";
import { useDarkMode } from "../../context/DarkModeContext";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";

import TechStacks from "./TechStacks";

import PageTitle from "../shared/PageTitle";

import anime from "animejs";

export default function AboutContent() {
  const { dk } = useDarkMode();
  const theme = useTheme();
  const location = useLocation();
  const [gridSize, setGridSize] = useState({ numRows: 11, numCols: 1 });
  const [aboutImage, setAboutImage] = useState();
  const [aboutImageBBg, setAboutImageBBg] = useState();
  const [aboutImageWBg, setAboutImageWBg] = useState();
  const [authorInfo, setAuthorInfo] = useState(null);
  useEffect(() => {
    contentfulClient
      .getEntry(import.meta.env.VITE_ABOUT_IMAGE_ID)
      .then((response) => {
        console.log(response);
        setAboutImage(response.fields.authorImg.fields.file.url);
        setAboutImageBBg(response.fields.authorImgBBg.fields.file.url);
        setAboutImageWBg(response.fields.authorImgWBg.fields.file.url);
        setAuthorInfo({
          short: response.fields.personalInfoShort,
          full: response.fields.personalInfoLong.content.map(
            (item) => item.content[0].value
          ),
        });
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
          paddingX: { sm: "3rem", md: "5rem", lg: "10rem" },

          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: { xs: "center", md: "flex-start" },
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
                    background: `url(${dk ? aboutImageBBg : aboutImageWBg})`,
                    backgroundPosition: {
                      xs: ` ${-maxWidth * 1.8}vw ${bgY * 1.8}vw`,
                      sm: ` ${-maxWidth * 0.9}vw ${bgY * 0.9}vw`,
                      lg: ` ${-maxWidth * 0.55}vw ${bgY * 0.55}vw`,
                    },
                    filter: "brightness(130%)",
                    backgroundSize: { xs: "100% auto", sm: "100% auto" },
                    backgroundRepeat: "noRepeat",
                    width: {
                      xs: `${maxWidth * 1.8}vw`,
                      sm: `${maxWidth * 0.9}vw`,
                      lg: `${maxWidth * 0.55}vw`,
                    },
                    height: {
                      xs: `${maxHeight * 1.8}vw`,
                      sm: `${maxHeight * 0.9}vw`,
                      lg: `${maxHeight * 0.55}vw`,
                    },
                    // transition: "all 0.65s ease-in-out",

                    "&:hover": {
                      background: `url(${aboutImage})`,
                      backgroundPosition: {
                        xs: ` ${-maxWidth * 1.8}vw ${bgY * 1.8}vw`,
                        sm: ` ${-maxWidth * 0.9}vw ${bgY * 0.9}vw`,
                        lg: ` ${-maxWidth * 0.55}vw ${bgY * 0.55}vw`,
                      },
                      filter: "brightness(110%)",
                      backgroundRepeat: "noRepeat",
                      backgroundSize: {
                        xs: `100% ${101 * divArray.length}%`,
                        sm: `100% ${101 * divArray.length}%`,
                      },
                      width: {
                        xs: `${maxWidth * 1.8}vw`,
                        sm: `${maxWidth * 0.9}vw`,
                        lg: `${maxWidth * 0.55}vw`,
                      },
                      height: {
                        xs: `${maxHeight * 1.8}vw`,
                        sm: `${maxHeight * 0.9}vw`,
                        lg: `${maxHeight * 0.55}vw`,
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
                background: `url(${aboutImage})`,
                backgroundSize: { xs: "100% auto", sm: "100% auto" },
                backgroundRepeat: "noRepeat",
                width: {
                  xs: `${maxWidth * 1.8}vw`,
                  sm: `${maxWidth * 0.9}vw`,
                  lg: `${maxWidth * 0.55}vw`,
                },
                height: {
                  xs: `${maxHeight * 1.8 * gridSize.numRows}vw`,
                  sm: `${maxHeight * 0.9 * gridSize.numRows}vw`,
                  lg: `${maxHeight * 0.55 * gridSize.numRows}vw`,
                },
                transition: "all 0.65s ease-in-out",
                "&:hover": {
                  background: `url(${dk ? aboutImageBBg : aboutImageWBg})`,
                  backgroundSize: { xs: "100% auto", sm: "100% auto" },
                  backgroundRepeat: "noRepeat",
                  width: {
                    xs: `${maxWidth * 1.8}vw`,
                    sm: `${maxWidth * 0.9}vw`,
                    lg: `${maxWidth * 0.55}vw`,
                  },
                  height: {
                    xs: `${maxHeight * 1.8 * gridSize.numRows}vw`,
                    sm: `${maxHeight * 0.9 * gridSize.numRows}vw`,
                    lg: `${maxHeight * 0.55 * gridSize.numRows}vw`,
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
                  },
                }}
              >
                {authorInfo?.full.map((item, index) => {
                  return (
                    <Box
                      key={index}
                      sx={{ display: "flex", flexDirection: "column" }}
                    >
                      <Typography
                        sx={{ fontSize: "inherit",textAlign:{xs:"center", sm:"left"}, marginY: "0.5rem" }}
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
                  flexDirection: { xs: "column",sm:"row", md: "column", lg: "row" },
                  alignItems: "flex-start",
                  justifyContent: { xs: "flex-start", sm: "space-between",md: "flex-start", md: "space-between" },
                  width: "90%",
                  zIndex: "1000",
                }}
              >
                <Link to={"/works"}>
                  <Button
                    sx={{
                      marginTop: "2rem",
                      border: `2px solid ${theme.palette.text.highlight}`,
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
                  {authorInfo?.short}
                  <Link to={"/about"}>
                    <Button
                      sx={{
                        color: theme.palette.text.highlight,

                        "&:hover": {
                          background: theme.palette.text.highlightAlt,
                          color: theme.palette.text.primary,
                        },
                      }}
                    >
                      ...more
                    </Button>
                  </Link>
                </>
              }
            </Typography>
          )}
        </Box>
      </Box>
      {location.pathname === "/about" && <TechStacks />}
    </Box>
  );
}
