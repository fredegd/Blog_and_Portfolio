import React from "react";

import CloseIcon from "@mui/icons-material/Close";

import {
  Box,
  Typography,
  Slide,
  IconButton,
  Toolbar,
  AppBar,
  Dialog,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenPreview({
  openPreview,
  setOpenPreview,
  image,
  title,
  description,
}) {
  const theme = useTheme();

  const handleClose = () => {
    setOpenPreview(false);
  };

  return (
    <Box>
      <Dialog
        fullScreen
        open={openPreview}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar
          sx={{
            position: "relative",
            background: theme.palette.background.main,
          }}
        >
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
              sx={{ color: theme.palette.text.primary }}
            >
              <CloseIcon />
            </IconButton>
            <Typography
              sx={{ ml: 2, flex: 1, color: theme.palette.text.primary }}
              variant="h6"
              component="Box"
            >
              {title}
            </Typography>
          </Toolbar>
        </AppBar>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            p: { xs: "0.5rem", md: "2rem" },
          }}
          onClick={handleClose}
        >
          <img src={image} alt={title} width={"90%"} />
          <Typography
            variant="p"
            sx={{ width: { xs: "90%", md: "90%" }, textAlign: "justify" }}
          >
            {" "}
            {description}
          </Typography>
        </Box>
      </Dialog>
    </Box>
  );
}
