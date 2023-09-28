import { Box, Grid, Icon, Typography, IconButton, Link } from "@mui/material";

import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";

import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";

const staggerConfig = {
  animate: {
    // scale: [1,0.5, 1],
    // rotate: [0, 360],
    opacity: [1, 1, 0.5],
  },
  transition: {
    duration: 1,
    ease: "easeIn",
    times: [0, 0.5, 1],
    repeat: Infinity,
  },
};

const contactItems = [
  {
    id: "linkedin",
    name: "LinkedIN",
    linkTo: "https://www.linkedin.com/in/federicoegidi/",
    icon: LinkedInIcon,
  },
  {
    id: "github",
    name: "gitHub",
    linkTo: "https://github.com/fredegd",
    icon: GitHubIcon,
  },
  {
    id: "twitter",
    name: "Twitter ",
    linkTo: "https://twitter.com/tapiwoHB",
    icon: TwitterIcon,
  },
  {
    id: "instagram",
    name: "Instagram",
    linkTo: "https://www.instagram.com/tapiwo/",
    icon: InstagramIcon,
  },
];

export default function Contact() {
  const theme = useTheme();

  const [click, setClick] = useState(false);
  const clicker = () => {
    return click ? setClick(false) : setClick(true);
  };
  console.log("click", click);
  const controls = useAnimation();

  useEffect(() => {
    controls.start("animate");
  }, [clicker]);

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: { xs: "flex-start", sm: "flex-start" },
        paddingTop: "5rem",
      }}
    >
      
      <Box
        sx={{
          backgroundColor: theme.palette.text.highlight,
          fontSize: "20px",

          width: "100%",
          padding: "2.5rem",
          // marginTop: "5rem",
          zIndex: "1000",
        }}
      >
        <Typography variant="h1">Let´s get in Touch:</Typography>
      </Box>
      <Grid
        container
        spacing={2}
        justifyContent="center"
        alignItems="center"
        sx={{
          "& > div": {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          },
        }}
      >
        {contactItems.map((item) => {
          return (
            <Grid item key={item.id} xs={12} sm={6} md={3}>
              <motion.div
                key={item.id}
                style={{
                  margin: "1rem",
                  padding: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                variants={staggerConfig}
                // initial="animate"
                //  animate={controls}
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                whileTap={{ scale: 0.9 }}
              >
                <Link href={item.linkTo} target={"blank"} underline="hover">
                  <IconButton
                    sx={{
                      background: theme.palette.text.highlightAlt,
                      borderRadius: "10%",
                      width: {
                        xs: "300px",
                        sm: "230px",
                        md: "180px",
                        lg: "150px",
                      },
                      height: {
                        xs: "300px",
                        sm: "230px",
                        md: "180px",
                        lg: "150px",
                      },
                      transition: "all 0.5s ease-in-out",
                      "&:hover": {
                        border: `10px solid ${theme.palette.text.highlight}`,
                      },
                      fontSize: {
                        xs: "14rem",
                        sm: "10rem",
                        md: "9rem",
                        lg: "8rem",
                      },
                    }}
                  >
                    <item.icon
                      style={{
                        fontSize: "inherit",
                        color: theme.palette.text.highlight,
                        textAlign: "center",
                        textJustify: "center",
                      }}
                    />
                  </IconButton>
                </Link>
              </motion.div>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
