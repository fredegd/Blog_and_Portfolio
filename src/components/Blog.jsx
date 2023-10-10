import PageTitle from "./PageTitle";

import BlogListCF from "./BlogListCF";
import Footer from "./Footer";
import { Box } from "@mui/material";
export default function Blog() {
  window.scrollTo(0, 0);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        minHeight: "100vh",
        // overflow: "scroll",
        zIndex: "1000",
      }}
    >
      <Box
        zIndex={1000}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100vw",
          zIndex: "1000",
        }}
      >
        <PageTitle title={"BLOG"} />
        <BlogListCF />
      </Box>

      <Footer />
    </Box>
  );
}
