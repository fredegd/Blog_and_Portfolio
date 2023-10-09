import { Box } from "@mui/material";

import PageTitle from "./PageTitle";
import SocialContacts from "./SocialContacts";
import Footer from "./Footer";

export default function ContactContent() {
  return (

      <Box       sx={{
        marginBottom:"5rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        zIndex: "1000",
        
      }}>
        <PageTitle title={"LET'S GET IN TOUCH:"} />
        <SocialContacts />
      </Box>

  );
}
