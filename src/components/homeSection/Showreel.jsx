import * as React from "react";
import Box from "@mui/joy/Box";
import { Card } from "@mui/material";

export default function Showreel() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: {xs:"60vw",sm:"55vw",lg:"50vw",xl:"42vw"},
        width: "95%",
        maxWidth: "100%",
        background: "transparent",
        zIndex: 1000,
        position: "relative",
      }}
    >
      <Card sx={{ minWidth: 300, flexGrow: 1 }}>
        <video
          autoPlay
          loop
          muted
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: "translate(-50%, -50%)",
            zIndex: -1,
          }}
        //   poster="https://assets.codepen.io/6093409/river.jpg"
        >
          <source
            src="./src/assets/video.mp4"
            type="video/mp4"
          />
        </video>
      </Card>
    </Box>
  );
}
