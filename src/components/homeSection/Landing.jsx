import { Box } from "@mui/material";
import Hero from "./Hero";
import AboutContent from "../aboutSection/AboutContent";
import BlogPreview from "./BlogPreview";
import ContactContent from "../contactSection/ContactContent";
import Footer from "../shared/Footer";

export default function Landing({ blogs }) {
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
      <AboutContent />
      <BlogPreview blogs={blogs} />
      <ContactContent />
      <Footer />
    </Box>
  );
}
