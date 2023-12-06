import { Box } from "@mui/material";
import Hero from "./Hero";
import AboutContent from "../aboutSection/AboutContent";
import BlogPreview from "./BlogPreview";
import ContactContent from "../contactSection/ContactContent";
import Footer from "../shared/Footer";
import Showreel from "./Showreel";
import WorksPreview from "./WorksPreview";

export default function Landing({ blogs,works }) {
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
      <Showreel />
      <WorksPreview works={works} />
      <BlogPreview blogs={blogs} />
      <AboutContent />
      <ContactContent />
      <Footer />
    </Box>
  );
}
