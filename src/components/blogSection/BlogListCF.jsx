import { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import { client } from "../../client";
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
    <Box
      sx={{
        maxWidth: "1280px",
        paddingX: { xs: "1rem", sm: "2.5rem", md: "2.5rem" },
      }}
    >
      <Grid container spacing={5}>
        {blogs &&
          blogs.map((blog) => (
            <Grid item xs={12} sm={12} md={6} lg={4} key={blog.sys.id}>
              <BlogItemCard blog={blog} />
            </Grid>
          ))}
      </Grid>
    </Box>
  );
}
