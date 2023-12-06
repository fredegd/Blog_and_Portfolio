import { Link } from "react-router-dom";
import { Box } from "@mui/system";
import useTheme from "@mui/material/styles/useTheme";
import { Typography, Button, Grid } from "@mui/material";
import { motion, useAnimation } from "framer-motion";

import ItemCard from "../shared/ItemCard";

export default function BlogPreview({ blogs }) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        overflow: "scroll",
        paddingBottom: "5rem",
        zIndex: "1000",
      }}
    >
      <motion.div
        style={{
          margin: "5rem 0 2rem 0",
          padding: "0 0.5rem",
        }}
        whileHover={{
          scale: 1.01,
        }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 100, damping: 10 }}
      >
        <Link
          to={"/blog"}
          style={{
            textDecoration: "none",
            color: theme.palette.text.primary,
            zIndex: "1000",
          }}
        >
          <Box
            sx={{
              backgroundColor: `${theme.palette.background.main}88`,
              color: theme.palette.text.primary,
              width: "100%",
              paddingY: "2.5rem",
              marginBottom: "5rem",
              border: `5px solid ${theme.palette.text.highlightAlt}`,
              zIndex: "1000",
              transition: "all 0.3s ease-in-out",
              "&:hover": {
                backgroundColor: theme.palette.background.secondary,
                color: theme.palette.text.highlightAlt,
                fontSize: "1.1rem",
              },
            }}
          >
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: "8vw", md: "8vw", lg: "5rem" },
                fontWeight: "500",
                transition: " all 0.5s ease-in-out",
              }}
            >
              Latest from the Blog:
            </Typography>
          </Box>
        </Link>
      </motion.div>

      <Box
        sx={{
          zIndex: "100",
          width: "100%",
          padding: { xs: "1.5rem", md: "2.5rem" },
        }}
      >
        <Grid container spacing={5}>
          {blogs.map((blog, index) => {
            return (
              index < 3 && (
                <Grid item xs={12} sm={12} md={6} lg={4} key={blog.sys.id}>
                  <ItemCard item={blog} sectionPath={"/blog/"}/>
                </Grid>
              )
            );
          })}
        </Grid>
      </Box>
    </Box>
  );
}
