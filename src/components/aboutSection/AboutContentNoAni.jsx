import { Box, Typography, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { contentfulClient } from "../../utils/contentfulClient";
import { useDarkMode } from "../../context/DarkModeContext";

import { displayContent } from "../../utils/blogDataFormatter";

import TechStacks from "./TechStacks";

import PageTitle from "../shared/PageTitle";

import anime from "animejs";

export default function AboutContentNoAni() {
  const { dk } = useDarkMode();
  const theme = useTheme();
  const location = useLocation();
  const [aboutImage, setAboutImage] = useState();

  const [authorInfo, setAuthorInfo] = useState(null);
  useEffect(() => {
    contentfulClient
      .getEntry(import.meta.env.VITE_ABOUT_IMAGE_ID)
      .then((response) => {
        setAboutImage(response.fields.authorImg.fields.file.url);
        setAuthorInfo({
          short: response.fields.personalInfoShort,
          full: response.fields.personalInfoLong,
        });
      })
      .catch((err) => console.log(err));
  }, []);

  window.scrollTo(0, 0);
  const maxWidth = 45;
  const maxHeight = maxWidth * 1.5;

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
        <Box
          sx={{
            top: "5rem",
          }}
        >
          {aboutImage && (
            <Box
              sx={{
                position: "relative",
                backgroundImage: `url(${aboutImage})`,
                backgroundSize: { xs: "100% auto", sm: "100% auto" },
                backgroundPosition: "center",

                backgroundRepeat: "repeat",
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
                transition: "all 0.65s ease-in-out",
              }}
            ></Box>
          )}
        </Box>

        <Box>
          {location.pathname === "/about" && (
            <>
              {displayContent(authorInfo?.full)}

              <Box
                sx={{
                  display: "flex",
                  flexDirection: {
                    xs: "column",
                    sm: "row",
                    md: "column",
                    lg: "row",
                  },
                  alignItems: "flex-start",
                  justifyContent: {
                    xs: "flex-start",
                    sm: "space-between",
                    md: "space-between",
                  },
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
            <Typography variant="body1" textAlign={"left"}>
              {authorInfo?.short}
              <Link to={"/about"}>
                <Button
                  sx={{
                    color: theme.palette.text.highlight,
                    fontSize: "inherit",
                    "&:hover": {
                      background: theme.palette.text.highlightAlt,
                      color: theme.palette.text.primary,
                    },
                  }}
                >
                  more...
                </Button>
              </Link>
            </Typography>
          )}
        </Box>
      </Box>
      {location.pathname === "/about" && <TechStacks />}
    </Box>
  );
}
