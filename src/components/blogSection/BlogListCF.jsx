import { useEffect, useState } from "react";
import { contentfulClient } from "../../utils/contentfulClient";
import ItemCard from "../shared/ItemCard";
import { Box, Grid, Typography } from "@mui/material";

export default function BlogListCF() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    contentfulClient
      .getEntries({
        content_type: "fredegdBlog",
      })
      .then((response) => {
        setBlogs(response.items);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <Box
      sx={{
        width: "100vw",

        maxWidth: "1280px",
        paddingX: { xs: "1rem", sm: "2.5rem", md: "2.5rem" },
      }}
    >
      <Grid container spacing={5}>
        {blogs &&
          blogs.map((blog) => (
            <Grid item xs={12} sm={12} md={6} lg={4} key={blog.sys.id}>
              <ItemCard item={blog} />
            </Grid>
          ))}
      </Grid>
    </Box>
  );
}
