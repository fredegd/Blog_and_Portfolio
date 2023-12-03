import { Box, Typography, Grid } from "@mui/material";
import { useTheme } from "@emotion/react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import BlogItemCard from "./BlogItemCard";
import { contentfulClient } from "../../utils/contentfulClient";
export default function RelatedPosts() {
  const theme = useTheme();

  const [related, setRelated] = useState([]);
  const { blogItemid } = useParams();
  useEffect(() => {
    contentfulClient
      .getEntries({
        content_type: "fredegdBlog",
        order: "-sys.createdAt",
      })
      .then((response) => {
        const related = response.items.filter(
          (blog) => blog.sys.id !== blogItemid
        );
        // console.log(related);
        setRelated(related);
      })
      .catch((err) => console.log(err));
  }, [blogItemid]);
  return (
    <Box
      sx={{
        zIndex: "1000",
        width: { xs: "100vw", lg: "1280px" },
        background: `${theme.palette.background.secondary}88`,
        display: "flex",
        flexDirection: "column",
        overflowX: "visible",
        alignItems: "center",
        // border: `2px solid ${theme.palette.text.highlightAlt}`,
      }}
    >
      <Box sx={{ width: { xs: "100%" } , padding:"2rem"}}>
        <Typography
          variant="h5"
          sx={{
            backgroundColor: `${theme.palette.text.highlight}88`,

            border: `5px solid ${theme.palette.text.highlight}`,
            color: theme.palette.text.primary,
            padding: "1rem",
            textAlign: "left",
            maxWidth: "1280px",
            margin: "1rem 0",
            paddingLeft: "2rem",
          }}
        >
          Related:{" "}
        </Typography>

        <Box sx={{ zIndex: "100", width: "100%", padding:"2rem"}}>
          <Grid container spacing={5}>
            {related.map((blog) => (
              <Grid item xs={12} sm={12} md={6} lg={4} key={blog.sys.id}>
                <BlogItemCard blog={blog} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
