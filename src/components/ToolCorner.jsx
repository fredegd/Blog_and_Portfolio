import { Box, IconButton, Typography } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import { useState } from "react";

export default function ToolCorner({ handleDrawerBgChange, dk, theme }) {
  const BGoptionsUIIcon = (
    <IconButton
      aria-label="openBackgroudEditor"
      edge="start"
      onClick={handleDrawerBgChange}
      sx={{
        color: theme.palette.text.primary,

        width: { xs: "1.6rem", sm: "1.6rem" },
        height: { xs: "1.6rem", sm: "1.6rem" },
        padding: "1.8rem",
        position: "absolute",
        transform: "rotate(-45deg)",
        top: "-1.55rem",
        left: "-3.6rem",
        "&:hover": {

          background: "transparent",
        },
      }}
    >
      <Typography variant={"h6"} textAlign={"center"}>
        <SettingsIcon sx={{ fontSize: { xs: "2.4rem", sm: "2.2rem" } }} />
      </Typography>
    </IconButton>
  );

  return (
    <Box>
      <Box
        sx={{
          position: "fixed",
          bottom: "-1.1rem",
          right: "-4.6rem",
          width: "15rem",
          height: "8rem",
          zIndex: "1001",
          transform: "rotate(45deg) translate(7rem, 0)",

          background: theme.palette.background.primary,

          borderTop: `4rem solid ${theme.palette.text.highlightAlt + "66"}`,
          borderLeft: `4rem solid ${theme.palette.text.highlightAlt + "88"}`,
          borderRight: "4rem solid transparent",
          borderBottom: `4rem solid ${theme.palette.text.highlightAlt}99`,
          transition: "all 0.5s ease-in-out",
          "&:hover": {
            borderTop: `4rem solid ${theme.palette.text.highlightAlt + "66"}`,
            borderLeft: `4rem solid ${theme.palette.text.highlightAlt }`,
            borderRight: "4rem solid transparent",
            borderBottom: `4rem solid ${theme.palette.text.highlightAlt}99`,
            transform: "rotate(45deg) translate(4rem, 0)",
          },
        }}
      >
        {BGoptionsUIIcon}
      </Box>
    </Box>
  );
}
