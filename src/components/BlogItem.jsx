import { Form, useForm } from "react-hook-form";

import { motion, useScroll } from "framer-motion";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { useTheme } from "@mui/material/styles";

import { client } from "../client";
import {
  Box,
  Typography,
  IconButton,
  Popover,
  TextField,
  FormControl,
  Button,
  Input,
} from "@mui/material";

import { KeyboardArrowUp, KeyboardArrowLeft } from "@mui/icons-material";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";
import RelatedPosts from "./RelatedPosts";
import Footer from "./Footer";
import BlogItemHeading from "./BlogItemHeading";
export default function BlogItem() {
  const theme = useTheme();
  const [blog, setBlog] = useState();
  const [contentImages, setContentImages] = useState([]);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null); // for popover

  const { blogItemid } = useParams();
  const { scrollYProgress } = useScroll();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    reset();
  };
  // console.log(watch("comment")); // watch input value by passing the name of it

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    client
      .getEntry(blogItemid)
      .then((response) => {
        setBlog(response.fields);
        window.scrollTo(0, 0);

        console.log(response.fields);
        // console.log(response.sys.id, blogItemid);
        if (response.fields.contentImages) {
          // console.log(response.fields.contentImages);
          setContentImages(response.fields.contentImages);
        }
      })
      .catch((err) => console.log(err));
  }, [blogItemid]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        // Show the button when scrolling down 200px
        setShowBackToTop(true);
      } else {
        // Hide the button when scrolling back to the top
        setShowBackToTop(false);
      }
    };

    // Add the scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const options = {
    renderNode: {
      [BLOCKS.HEADING_1]: (node, children) => <h1>{children}</h1>,
      [BLOCKS.PARAGRAPH]: (node, children) => {
        const { content } = node;
        // console.log(node)
        const text = content.map((c) => c.value).join("");
        if (text.startsWith("#img")) {
          const imgIndex = parseInt(text.substring(4));
          if (blog && blog.contentImages && blog.contentImages[imgIndex]) {
            const imgUrl = blog.contentImages[imgIndex].fields.file.url;
            // console.log(imgIndex)
            return (
              <Box key={imgIndex + "img"}>
                <Box
                  sx={{
                    marginY: { xs: "1rem", sm: "2rem", md: "3rem", lg: "4rem" },
                    height: {
                      xs: "90vw",
                      sm: "60vw",
                      md: "600px",
                      lg: "600px",
                    },
                    width: { xs: "90vw", sm: "90vw", md: "800px", lg: "800px" },
                    backgroundImage: `url(${contentImages[imgIndex].fields.file.url})`,
                    backgroundPosition: "center",
                    backgroundSize: `100% auto`,
                    backgroundRepeat: "no-repeat",
                    transition: "all 0.5s ease-in-out",
                  }}
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

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    handlePopoverClose();
  };

  const open = Boolean(anchorEl);

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
            paddingX: { xs: "1rem", sm: "2rem", md: "3rem", lg: "3rem" },


            background: {xs:`linear-gradient(90deg, #00000000 0%,${theme.palette.background.transparent} 5%, ${theme.palette.background.main} 20%, ${theme.palette.background.main} 80%, ${theme.palette.background.transparent} 95%,  #00000000 100%)`,
            lg: `linear-gradient(90deg, #00000000 0%,${theme.palette.background.transparent} 15%, ${theme.palette.background.main} 30%, ${theme.palette.background.main} 70%, ${theme.palette.background.transparent} 85%,  #00000000 100%)`,},
            display: "flex",
            flexDirection: "column",
            overflowX: "visible",
            alignItems: "center",
          }}
        >
<BlogItemHeading blog={blog} />

          <Box
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
            {displayContent(blog.content)}
          </Box>

          <Typography variant="h1">{"*****"}</Typography>

          <FormControl
            fullWidth
            // sx={{ background: "red" }}
            onSubmit={handleSubmit(onSubmit)}
          >
            <Input id="my-input" aria-describedby="my-helper-text" />

            <TextField
              id="comment"
              height="100%"
              label="comment"
              {...register("comment")}
            />
            <Button type="submit">sub</Button>
          </FormControl>
        </Box>

        <RelatedPosts />
        <Footer />

        <motion.div
          className="progress-bar"
          style={{
            zIndex: "1000",
            scaleX: scrollYProgress,
            position: "fixed",
            top: "5rem",
            left: 0,
            right: 0,
            height: "1rem",
            transformOrigin: "0%",
            background: theme.palette.text.highlightAlt,
          }}
        />

        {showBackToTop && (
          <IconButton
            id="back to top"
            onClick={scrollToTop}
            sx={{
              zIndex: "1000",
              position: "fixed",
              bottom: "3rem",
              right: "1rem",
              backgroundColor: theme.palette.text.highlightAlt,
              color: theme.palette.primary.contrastText,
              "&:hover": { backgroundColor: theme.palette.text.primary },
            }}
            onMouseEnter={handlePopoverOpen}
            onMouseLeave={handlePopoverClose}
          >
            <KeyboardArrowUp />
          </IconButton>
        )}

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
        <Popover
          id="mouse-over-popover"
          sx={{
            pointerEvents: "none",
          }}
          open={open}
          anchorEl={anchorEl && anchorEl}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          onClose={handlePopoverClose}
          disableRestoreFocus
        >
          <Typography
            sx={{
              p: 1,
              border: `2px solid ${theme.palette.text.highlightAlt}`,
            }}
          >
            {anchorEl && anchorEl.id}
          </Typography>
        </Popover>
      </Box>
    );
  }
}
