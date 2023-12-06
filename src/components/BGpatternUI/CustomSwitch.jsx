import { styled, useTheme } from "@mui/material/styles";
import Switch from "@mui/material/Switch";

export const CustomSwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  "& .MuiSwitch-switchBase": {
    margin: 1,
    padding: 0,
    transform: "translateX(6px)",
    "&.Mui-checked": {
      color: "#fff",
      transform: "translateX(22px)",
      "& .MuiSwitch-thumb:before": {
        // backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        //   "#fff"
        // )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      "& + .MuiSwitch-track": {
        opacity: 1,
        background:
          theme.palette.mode === "dark"
            ? theme.palette.text.primary
            : theme.palette.text.primary,
      },
    },
  },
  "& .MuiSwitch-thumb": {
    background:
      theme.palette.mode === "dark"
        ? theme.palette.text.contrast
        : theme.palette.text.contrast,
    border:
      theme.palette.mode === "dark"
        ? `1px solid ${theme.palette.text.primary}`
        : `1px solid ${theme.palette.text.primary}`,
    width: 32,
    height: 32,

    "&:before": {
      content: "attr(width)",
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
    },
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    background:
      theme.palette.mode === "dark"
        ? theme.palette.text.primary
        : theme.palette.text.primary,
    borderRadius: 20 / 2,
  },
}));
