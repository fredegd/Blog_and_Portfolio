import { Box } from "@mui/material";
import ContactContent from "./ContactContent";
import Footer from "./Footer";

export default function Contact() {
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
<ContactContent/>
      <Footer />
    </Box>
  );
}
