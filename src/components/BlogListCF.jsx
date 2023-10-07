import { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import { client } from "../client";

import BlogItemCard from "./BlogItemCard";
import { Box, Grid, Typography } from "@mui/material";


export default function BlogListCF() {
  const [blogs, setBlogs] = useState([]);

  const theme = useTheme();

  useEffect(() => {
    client
      .getEntries({
        content_type: "fredegdBlog",
      })
      .then((response) => {
        setBlogs(response.items);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleSearchChange = (e) => {
    setSearchKeyword(e.target.value);
  };

  // const filteredBlogs = blogs.filter((blog) =>
  //   blog.fields.title.toLowerCase().includes(searchKeyword.toLowerCase())
  // );

  return (
    <Box zIndex={1000}>
   
      <Box
        sx={{
          backgroundColor: `${theme.palette.text.highlight}88`,
          fontSize: "20px",
          color: theme.palette.text.primary,
          width: "100%",
          padding: "2.5rem",
          marginBottom: "5rem",
        }}
      >
        <Typography variant="h1">Blog</Typography>
      </Box>

      <Box sx={{  width: "100%", padding: "2.5rem" }}>
        <Grid container spacing={5}>
          {blogs.map((blog) => (
            <Grid item xs={12} sm={12} md={6} lg={4} key={blog.sys.id}>
              <BlogItemCard blog={blog} />
            </Grid>
          ))}
        </Grid>
      </Box>

    </Box>
  );
}
