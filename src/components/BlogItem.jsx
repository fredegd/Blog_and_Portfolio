import { useForm } from "react-hook-form";

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
  InputLabel,
  OutlinedInput,
  InputAdornment,
} from "@mui/material";

import { KeyboardArrowUp, KeyboardArrowLeft } from "@mui/icons-material";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";
import RelatedPosts from "./RelatedPosts";
import Footer from "./Footer";

export default function BlogItem() {
  const theme = useTheme();
  const [blog, setBlog] = useState();
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null); // for popover

  const { blogItemid } = useParams();
  const { scrollYProgress } = useScroll();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);
  console.log(watch("comment")); // watch input value by passing the name of it

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
        console.log(response.fields, "testtt");
        setBlog(response.fields);
        window.scrollTo(0, 0);

        console.log(response.fields);
        console.log(response.sys.id, blogItemid);
        if (response.fields.images) {
          console.log(response.fields.images);
          setBlogImgs(response.fields.images);
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
      [BLOCKS.PARAGRAPH]: (node, children) => <p>{children}</p>,
      [BLOCKS.HEADING_1]: (node, children) => <h1>{children}</h1>,
      // Add more renderNode functions as needed for other block types
    },
    renderMark: {},
    renderInline: {},
  };
  const renderRichText = (richText) => {
    return documentToReactComponents(richText, options);
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
          padding: "2.5rem",
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
            padding: "0 0 5rem 0",
            width: "100%",
            background: `linear-gradient(90deg, #00000000 0%,${theme.palette.background.transparent} 20%, ${theme.palette.background.main} 40%, ${theme.palette.background.main} 60%, ${theme.palette.background.transparent} 80%,  #00000000 100%)`,
            display: "flex",
            flexDirection: "column",
            overflowX: "visible",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              boxShadow: `0px 0px 10px 0px ${theme.palette.text.highlightAlt}`,
              backgroundColor: theme.palette.background.main,
              padding: "2rem 1.5rem 3rem 1.5rem",
              textAlign: "left",
            }}
          >
            <Box
              sx={{
                height: { xs: "90vw", sm: "60vw", md: "50vw", lg: "40vw" },
                width: { xs: "90vw", sm: "90vw", md: "85vw", lg: "70vw" },
                backgroundImage: `url(${blog.blogTitleImage.fields.file.url})`,
                backgroundPosition: "center",
                backgroundSize: `100% auto`,
                backgroundRepeat: "no-repeat",
                transition: "all 0.5s ease-in-out",
              }}
            >
              {/* background image */}
            </Box>

            <Typography
              variant="h1"
              sx={{
                width: { xs: "auto", sm: "90vw", md: "85vw", lg: "70vw" },
                fontSize: {
                  xs: "6.2vw",
                  sm: "6.5vw",
                  md: "5.5vw",
                  lg: "4.5vw",
                },
                padding: "1rem",
                transition: "all 0.5s ease-in-out",
                fontWeight: "bold",
              }}
            >
              {blog.title}
            </Typography>

            <Typography
              variant="h4"
              sx={{
                fontSize: { xs: "5vw", sm: "4vw", md: "3.5vw", lg: "2.55vw" },
                fontStyle: "italic",
                padding: { xs: "1rem", md: "3rem" },
                pb: "1rem",
              }}
            >
              {"  "}"{blog.subtitle}"
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                px: { xs: 2, md: 5 },
                fontSize: { xs: "2.5vw", sm: "1rem", md: "1.2rem", lg: "1rem" },
                gap: "0.3rem",
              }}
            >
              <Typography variant="p">
                Published on: "{blog.createdAt}" by "{blog.blogAuthor.fields.authorName}"
              </Typography>
              <Typography variant="p">
                Last edit: "{blog.editAt}"  {} min. Read
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                }}
              >
                <Typography variant="p" sx={{ textAlign: "center" }}>
                  Tags:
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    flexWrap: "wrap",
                    gap: "1rem",
                  }}
                >
                  {blog.tags.tags.map((tag, index) => {
                    return (
                      <Typography
                        key={index}
                        variant="p"
                        sx={{
                          mx: "1rem",
                          backgroundColor: theme.palette.text.highlightAlt,
                          padding: "0.2rem 0.8rem",
                          borderRadius: "1rem",
                        }}
                      >
                        {tag}
                      </Typography>
                    );
                  })}
                </Box>
              </Box>
            </Box>
          </Box>

          <Box
            sx={{ marginTop: "3rem", marginBottom: "3rem", maxWidth: "800px" }}
          >
            {renderRichText(blog.content)}
          </Box>
          <Typography variant="h1">{"*****"}</Typography>

          <FormControl
            fullWidth
            sx={{ background: "red" }}
            onSubmit={handleSubmit(onSubmit)}
          >
            <TextField
              id="comment"
              height="100%"
              // startAdornment={<InputAdornment position="start">***</InputAdornment>}
              label="comment"
              {...register("comment")}
            />
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
