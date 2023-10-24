import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

import { Box, Typography, IconButton } from "@mui/material";

import { KeyboardArrowUp, KeyboardArrowLeft } from "@mui/icons-material";
import { client } from "../client"; // contentful client
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";
import BlogItemHeading from "./BlogItemHeading";
import MyCommentBox from "./MyCommentBox";
import { postData } from "../postCommentData";
import RelatedPosts from "./RelatedPosts";
import Footer from "./Footer";
import ScrollToTop from "./ScrollToTop";
import PopOver from "./PopOver";
import ScrollIndicator from "./ScrollIndicator";

export default function BlogItem() {
  const theme = useTheme();
  const [blog, setBlog] = useState();
  const [contentImages, setContentImages] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null); // for popover

  const { blogItemid } = useParams();

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const [blogContentHeight, setBlogContentHeight] = useState(0);

  useEffect(() => {
    client
      .getEntry(blogItemid)
      .then((response) => {
        setBlog(response);
        window.scrollTo(0, 0);

        console.log(response);
        // console.log(response.sys.id, blogItemid);
        if (response.fields.contentImages) {
          // console.log(response.fields.contentImages);
          setContentImages(response.fields.contentImages);
        }
      })
      .catch((err) => console.log(err));
  }, [blogItemid]);

  useEffect(() => {
    const blogContent = document.querySelector(".blog-content");
    if (blogContent) {
      setBlogContentHeight(blogContent.clientHeight);
    }
  }, [blog]);

  const options = {
    renderNode: {
      [BLOCKS.HEADING_1]: (node, children) => <h1>{children}</h1>,
      [BLOCKS.PARAGRAPH]: (node, children) => {
        const { content } = node;
        // console.log(node)
        const text = content.map((c) => c.value).join("");
        if (text.startsWith("#img")) {
          const imgIndex = parseInt(text.substring(4));
          if (
            blog &&
            blog.fields.contentImages &&
            blog.fields.contentImages[imgIndex]
          ) {
            const imgUrl = blog.fields.contentImages[imgIndex].fields.file.url;
            // console.log(imgIndex)
            return (
              <Box key={imgIndex + "img"}>
                <Box
                  component="img"
                  sx={{
                    marginY: { xs: "1rem", sm: "2rem", md: "3rem", lg: "4rem" },
                    height: "auto", //{ xs: "97vw", sm: "90vw", md: "900px", lg: "900px" },
                    width: { xs: "97vw", sm: "90vw", md: "900px", lg: "900px" },
                    backgroundPosition: "center",
                    backgroundSize: `contain`,
                    backgroundRepeat: "no-repeat",
                    transition: "all 0.5s ease-in-out",
                  }}
                  src={imgUrl}
                >
                  {/* content image */}
                  {/* <Typography variant="h1" >WTF</Typography> */}
                </Box>
              </Box>
            );
          }
        }
        return <p>{children}</p>;
      }, // Add more renderNode functions as needed for other block types
    },
    renderMark: {},
    renderInline: {},
  };
  const renderRichText = (richText) => {
    return documentToReactComponents(richText, options);
  };

  const blogLength =
    blog &&
    renderRichText(blog.fields.content).map((el) => {
      return (
        typeof el.props.children[0] === "string" && el.props.children[0].length
      );
    });

  const displayContent = (content) => {
    let id = 0;
    const paragraphs = renderRichText(content);
    const update = paragraphs.map((paragraph, index) => {
      if (paragraph.props.children[0] === `img0${id}`) {
        console.log(id);
        console.log(paragraph.props);
        id++;
        return (
          <Box
            key={index}
            sx={{
              height: { xs: "90vw", sm: "60vw", md: "50vw", lg: "40vw" },
              width: { xs: "90vw", sm: "90vw", md: "85vw", lg: "70vw" },
              backgroundImage: `url(${contentImages[0].fields.file.url})`,
              backgroundPosition: "center",
              backgroundSize: `100% auto`,
              backgroundRepeat: "no-repeat",
              transition: "all 0.5s ease-in-out",
            }}
          >
            {/* content image */}
          </Box>
        );
      } else {
        return paragraph;
      }
    });

    return update;
  };

  if (!blog) {
    // console.log("done");
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
        <Box
          sx={{
            zIndex: "1000",
            width: { xs: "100vw", sm: "100vw", md: "100vw", lg: "100vw" },
            paddingBottom: "5rem",
            paddingTop: "3rem",
            paddingX: { xs: "0.5rem", sm: "2rem", md: "2.5rem", lg: "3rem" },

            background: {
              xs: `linear-gradient(90deg, #00000000 0%,${theme.palette.background.transparent} 5%, ${theme.palette.background.main} 20%, ${theme.palette.background.main} 80%, ${theme.palette.background.transparent} 95%,  #00000000 100%)`,
              lg: `linear-gradient(90deg, #00000000 0%,${theme.palette.background.transparent} 15%, ${theme.palette.background.main} 30%, ${theme.palette.background.main} 70%, ${theme.palette.background.transparent} 85%,  #00000000 100%)`,
            },
            display: "flex",
            flexDirection: "column",
            overflowX: "visible",
            alignItems: "center",
          }}
        >
          <BlogItemHeading blog={blog} />

          <Box
            className="blog-content"
            sx={{
              marginTop: "3rem",
              marginBottom: "3rem",
              maxWidth: "900px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "justify",
            }}
          >
            {displayContent(blog.fields.content)}
          </Box>
          <MyCommentBox
            subjectId={blog.sys.id}
            postData={postData}
            contentfulClient={client}
          />
        </Box>

        {/* <RelatedPosts /> */}
       <ScrollIndicator />
        <Footer />

        <ScrollToTop />

       

        <PopOver anchorEl={anchorEl} handlePopoverClose={handlePopoverClose} />

        <Box>
          {/* Back to "/blog" button */}
          <Link to="/blog" style={{ textDecoration: "none" }}>
            <IconButton
              id="back to blog"
              sx={{
                zIndex: "1000",
                position: "fixed",
                top: "6rem",
                left: "1.0rem",
                backgroundColor: theme.palette.text.highlightAlt,
                color: theme.palette.primary.contrastText,
                "&:hover": {
                  backgroundColor: theme.palette.text.primary,
                },
              }}
              onMouseEnter={handlePopoverOpen}
              onMouseLeave={handlePopoverClose}
            >
              <KeyboardArrowLeft />
            </IconButton>
          </Link>
        </Box>
      </Box>
    );
  }
}
