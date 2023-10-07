import { Box } from "@mui/material";

import PageTitle from "./PageTitle";
import SocialContacts from "./SocialContacts";
import Footer from "./Footer";

export default function ContactContent() {
  return (

      <Box zIndex={1000}>
        <PageTitle title={"Let´s get in Touch:"} />
        <SocialContacts />
      </Box>

  );
}
