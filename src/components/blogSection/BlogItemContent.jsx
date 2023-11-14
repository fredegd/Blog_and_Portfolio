import { Box, Divider } from "@mui/material";
import { displayContent } from "../../utils/blogDataFormatter";
export default function BlogItemContent({ blog }) {
  return (
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
      <Divider sx={{ width: "100%" }} />
    </Box>
  );
}
