import { useEffect, useState } from "react";
import contactItems from "../contactItems";
import { Box, Grid, Typography, IconButton, Link } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import { motion, useAnimation } from "framer-motion";

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

export default function SocialContacts() {
  const theme = useTheme();

  const [click, setClick] = useState(false);
  const clicker = () => {
    return click ? setClick(false) : setClick(true);
  };

  const controls = useAnimation();

  useEffect(() => {
    controls.start("animate");
  }, [clicker]);

  return (
    <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
      <Grid
        container
        spacing={2}
        alignItems="center"
        sx={{
          maxWidth: "900px",
          paddingX: { xs: "2rem", md: "2.5rem" },
          "& > div": {
            display: "flex",
            alignItems: "flex-start",
            justifyContent: { xs: "center", sm: "center", md: "flex-start" },
          },
        }}
      >
        {contactItems.map((item) => {
          return (
            <Grid item key={item.id} xs={6} sm={6} md={12}>
              <Link href={item.linkTo} target={"blank"} underline="hover">
                <motion.div
                  key={item.id}
                  style={{
                    margin: "0 1.5rem 1.5rem 0",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  variants={staggerConfig}
                  // initial="animate"
                  //  animate={controls}
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 8 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <IconButton
                    sx={{
                      background: theme.palette.background.main,
                      border: `10px solid ${theme.palette.text.highlightAlt}`,
                      color: theme.palette.text.highlightAlt,
                      borderRadius: "1.5rem",
                      width: {
                        xs: "100px",
                        sm: "200px",
                        md: "180px",
                        lg: "150px",
                      },
                      height: {
                        xs: "100px",
                        sm: "200px",
                        md: "180px",
                        lg: "150px",
                      },
                      transition: " 0.4s ease-in-out",
                      "&:hover": {
                        color: theme.palette.text.highlight,
                        background: theme.palette.background.main,
                        border: `10px solid ${theme.palette.text.highlight}`,
                        borderRadius: "2.2rem",
                      },
                      fontSize: {
                        xs: "4rem",
                        sm: "8rem",
                        md: "9rem",
                        lg: "8rem",
                      },
                    }}
                  >
                    <item.icon
                      style={{
                        fontSize: "inherit",
                        textAlign: "center",
                        textJustify: "center",
                      }}
                    />
                  </IconButton>
                  <Box
                    sx={{
                      zIndex: "1000",
                      display: { xs: "block", md: "none" },
                    }}
                  >
                    <Typography variant="h6" textDecoration={"none"}>
                      {item.name}
                    </Typography>
                  </Box>
                </motion.div>
              </Link>
              <Link
                href={item.linkTo}
                target={"blank"}
                underline="hover"
                zIndex={100}
                sx={{
                  display: { xs: "none", md: "block" },
                  width: "100%",
                  height: {
                    md: "180px",
                    lg: "150px",
                  },
                  backgroundImage: ``,
                  backgroundColor: `${theme.palette.background.main}cc`,
                  boxShadow: `0 0 10px ${theme.palette.text.highlight}`,

                  "&:hover": {
                    border: `10px solid ${theme.palette.text.highlight}`,
                    boxShadow: `0 0 10px ${theme.palette.text.highlight}`,
                    borderRadius: "1.5rem",
                    // backgroundColor: `${theme.palette.text.highlight}88`,
                    backgroundImage: `url(${item.screenshot})`,
                    backgroundSize: "100% auto",
                    "& > p": {
                      display: "none",
                    },
                  },
                  color: theme.palette.text.primary,
                  transition: "all 0.35s ease-in-out",
                }}
              >
                <p>{item.shortText}</p>
              </Link>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
