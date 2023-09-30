import Hero from "./Hero";
import About from "./About";
import Contact from "./Contact";
import Footer from "./Footer";
import { Box } from "@mui/material";
import BlogPreview from "./BlogPreview";
export default function Landing({blogs}) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
        height: "auto",
        overflow: "scroll",
        background: "transparent",

      }}
    >
      <Hero />
      <BlogPreview blogs={blogs}/>
      <About />
      <Contact />
      <Footer/>
    </Box>
  );
}
