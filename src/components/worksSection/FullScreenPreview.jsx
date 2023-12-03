import React from "react";

import CloseIcon from "@mui/icons-material/Close";

import {
  Box,
  Button,
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
            <Typography
              sx={{
                ml: 2,
                flex: 1,
                color: theme.palette.text.primary,
                paddingY: "3rem",
              }}
              variant="h5"
              component="Box"
              textAlign={"center"}
            >
              {title}
            </Typography>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
              sx={{ color: theme.palette.text.primary }}
            >
              <CloseIcon />
            </IconButton>
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
          // onClick={handleClose}
        >
          <img src={image} alt={title} width={"90%"} />
          <Typography
            variant="p"
            sx={{ width: { xs: "90%", md: "90%" }, textAlign: "justify" }}
          >
            {" "}
            {description}
          </Typography>
          <Button
            onClick={handleClose}
            sx={{
              marginY: "2rem",
              border: `2px solid ${theme.palette.text.highlight}`,
              borderRadius: "2rem",
              width: { xs: "17rem", sm: "20rem" },
              // alignSelf: "flex-end",
              transition: "all 0.3s ease-in-out",
              "&:hover": {
                background: `${theme.palette.text.highlight}88`,

                transform: "translateX(-2.5rem)",
              },
            }}
          >
            ← back
          </Button>
        </Box>
      </Dialog>
    </Box>
  );
}
