import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

import { Box, IconButton } from "@mui/material";

import { KeyboardArrowLeft } from "@mui/icons-material";
import { contentfulClient } from "../../utils/contentfulClient"; // contentful client

import BlogItemHeading from "./BlogItemHeading";
import BlogItemContent from "./BlogItemContent";
import CommentBox from "./CommentBox";
import Footer from "../shared/Footer";
import ScrollToTop from "./ScrollToTop";
import ScrollIndicator from "./ScrollIndicator";

export default function BlogItem() {
  const theme = useTheme();
  const [blog, setBlog] = useState();
  const { blogItemid } = useParams();

  //fetching blog data from contentful
  useEffect(() => {
    contentfulClient
      .getEntry(blogItemid)
      .then((response) => {
        setBlog(response);
        window.scrollTo(0, 0);
      })
      .catch((err) => console.log(err));
  }, [blogItemid]);

  if (!blog) {
    return (
      <div>
        <h1>LOADING</h1>
      </div>
    );
  } else {
    return (
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <ScrollIndicator />
        <Box
          sx={{
            zIndex: "1000",
            width: { xs: "100vw", sm: "100vw", md: "100vw", lg: "100vw" },

            paddingX: { xs: "0.5rem", sm: "2rem", md: "2.5rem", lg: "3rem" },

            background: {
              xs: `linear-gradient(90deg, #00000000 0%,${theme.palette.background.transparent} 5%, ${theme.palette.background.main}cc 20%, ${theme.palette.background.main}cc 80%, ${theme.palette.background.transparent} 95%,  #00000000 100%)`,
              lg: `linear-gradient(90deg, #00000000 0%,${theme.palette.background.transparent} 15%, ${theme.palette.background.main}cc 30%, ${theme.palette.background.main}cc 70%, ${theme.palette.background.transparent} 85%,  #00000000 100%)`,
            },
            display: "flex",
            flexDirection: "column",
            overflowX: "visible",
            alignItems: "center",
          }}
        >
          <BlogItemHeading blog={blog} />
          <BlogItemContent blog={blog} />
          <CommentBox subjectId={blog.sys.id} />
        </Box>
        <Footer />

        <ScrollToTop />

        <Box>
          {/* Back to "/blog" button */}
          <Link to="/blog" style={{ textDecoration: "none" }}>
            <IconButton
              id="back to blog"
              sx={{
                zIndex: "1000",
                position: "fixed",
                top: "1rem",
                left: "1.0rem",
                backgroundColor: theme.palette.text.highlightAlt,
                color: theme.palette.primary.contrastText,
                "&:hover": {
                  backgroundColor: theme.palette.text.primary,
                },
              }}
              // onMouseEnter={handlePopoverOpen}
              // onMouseLeave={handlePopoverClose}
            >
              <KeyboardArrowLeft />
            </IconButton>
          </Link>
        </Box>
      </Box>
    );
  }
}
