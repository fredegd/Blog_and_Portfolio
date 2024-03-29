import { Box, IconButton, Typography } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";


export default function ToolCorner({ handleDrawerBgChange, dk, theme }) {
  const BGoptionsUIIcon = (
    <IconButton
      aria-label="openBackgroudEditor"
      edge="start"
      onClick={handleDrawerBgChange}
      sx={{
        borderRadius: 0,
        color: theme.palette.text.primary,
        paddingTop: "2.9rem",
        paddingBottom: "1.8rem",
        paddingRight: "4.5rem",
        position: "absolute",
        top: "-3.9rem",
        left: "-3.3rem",
        "&:hover": {
          background: "transparent",
        },
      }}
    >
      <Typography variant={"h6"} textAlign={"center"} >
        <SettingsIcon sx={{ fontSize: { xs: "2.4rem", sm: "2.2rem" }, transform:"rotate(-45deg)" }} />
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
