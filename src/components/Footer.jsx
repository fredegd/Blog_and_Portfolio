import { Box, Grid, Icon, Typography, IconButton, Link } from "@mui/material";

import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";

import contactItems from "../contactItems";

export default function Contact() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        height: "30vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: { xs: "flex-start", sm: "flex-start" },
        paddingTop: "5rem",
        zIndex: "1000",
      }}
    >
      <Box
        sx={{
          backgroundColor: `${theme.palette.text.highlight}88`,
          backgroundBlendMode: "difference",
          fontSize: "20px",
          color: theme.palette.text.contrast,
          marginY: "5rem",
          width: "100%",
          padding: "2.5rem",
          // marginTop: "5rem",
         
        }}
      >
        <Box sx={{}}>
          {contactItems.map((item) => (
            <Link href={item.linkTo} target="_blank" key={item.id}>
              <IconButton
                sx={{
                  borderRadius: "20%",
                  width: "2.0rem",
                  height: "2.0rem",
                  textAlign: "center",
                  margin: "0 1rem 0 1rem",
                  textDecoration: "none",
                  color: theme.palette.text.primary,

                  "&:hover": {
                    background: `${theme.palette.text.highlightAlt}`,

                    border: `1px solid ${theme.palette.text.primary}`,
                  },
                }}
              >
                <Typography variant={"h6"} sx={{ display: "flex" }}>
                  {<item.icon sx={{ fontSize: { xs: "1.5rem", sm: "2rem" } }} />}
                </Typography>
              </IconButton>
            </Link>
          ))}
        </Box>

        <Typography variant="p" color={theme.palette.text.primary}>
          2023 all rights reserved © Fred Egidi
        </Typography>
      </Box>
    </Box>
  );
}
