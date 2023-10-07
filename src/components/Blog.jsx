import React from "react";
import BlogListCF from "./BlogListCF";
import Footer from "./Footer";
import { Box } from "@mui/material";
export default function Blog() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        minHeight: "100vh",
        overflow: "scroll",
        // zIndex: "1000",
        background: "transparent",

      }}
    >
      
      <BlogListCF />
      <Footer />
    </Box>
  );
}
