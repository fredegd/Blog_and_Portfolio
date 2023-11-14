import { Box } from "@mui/material";
import ContactContent from "./ContactContent";
import Footer from "../shared/Footer";

export default function Contact() {
  window.scrollTo(0, 0);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        minHeight: "100vh",

        overflow: "scroll",
        zIndex: "1000",
      }}
    >
      <ContactContent />
      <Footer />
    </Box>
  );
}
