import { Box } from "@mui/system";
import useTheme from "@mui/material/styles/useTheme";
import { motion, useAnimation } from "framer-motion";

import { Typography, Button, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import BlogItemCard from "./BlogItemCard";

export default function BlogPreview({ blogs }) {
  const theme = useTheme();
  // console.log(theme)

  return (
    <Box
      sx={{
        width: { xs: "100%", sm: "100%", md: "100%", lg: "100%", xl: "100%" },
        minHeight: "100vh",

        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        overflow: "scroll",
        transition: "all 0.9s ease-in-out",
      }}
    >
      <motion.div
        style={{
          margin: "5rem 0 ",
          padding: "0 2.5rem",
          transition: "background 0.7s ",
        }}
        whileHover={{
          scale: 1.04,
        }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 100, damping: 10 }}
      >
        <Link
          to={"/blog"}
          style={{
            textDecoration: "none",
            color: theme.palette.text.primary,
            zIndex: "100",
          }}
        >
          <Button
            sx={{
              width: "100%",
              background: theme.palette.background.main,
              border: `10px solid ${theme.palette.text.highlightAlt}`,
              fontFamily: "IBM Plex Mono ",
              color: theme.palette.text.highlightAlt,
              p: 3,
              // borderRadius: "1em",
              "&:hover": {
                background: theme.palette.background.main,
                color: theme.palette.text.highlight,
                fontSize: "1.1rem",
              },
            }}
          >
            <Typography
              variant="h1"
              sx={{
                fontSize: {
                  xs: "3rem",
                  sm: "3.5rem",
                  md: "4rem",
                  lg: "4.5rem",
                  xl: "5rem",
                },

                transition: " all 0.3s ease-in-out",
              }}
            >
              Latest from the Blog:
            </Typography>
          </Button>
        </Link>
      </motion.div>

      <Box sx={{ zIndex: "100", width: "100%", padding: "2.5rem" }}>
        <Grid container spacing={5}>
          {blogs.map((blog) => (
            <Grid item xs={12} sm={6} md={4} key={blog.sys.id}>
              <BlogItemCard blog={blog} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
