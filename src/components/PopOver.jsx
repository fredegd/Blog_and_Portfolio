import { Typography, Popover } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function PopOver({ anchorEl, handlePopoverClose }) {
  const theme = useTheme();

  const open = Boolean(anchorEl);

  return (
    <Popover
      id="mouse-over-popover"
      sx={{
        pointerEvents: "none",

      }}
      open={open}
      anchorEl={anchorEl && anchorEl}
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      onClose={handlePopoverClose}
    //   disableRestoreFocus
    >
      <Typography
        sx={{
          p: 1,
          border: `2px solid ${theme.palette.text.highlightAlt}`,

          backgroundColor:theme.palette.text.highlightAlt,
          color: theme.palette.primary.contrastText,
        }}
      >
        {anchorEl && anchorEl.id}
      </Typography>
    </Popover>
  );
}
