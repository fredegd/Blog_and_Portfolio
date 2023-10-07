import { Box } from "@mui/material";

import PageTitle from "./PageTitle";
import SocialContacts from "./SocialContacts";
import Footer from "./Footer";

export default function ContactContent() {
  return (

      <Box       sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        // border: "1px solid black",
        zIndex: "1000",
      }}>
        <PageTitle title={"Let´s get in Touch:"} />
        <SocialContacts />
      </Box>

  );
}
