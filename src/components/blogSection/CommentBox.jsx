import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CommentList from "./CommentList";
import CommentForm from "./CommentForm";
import { contentfulClient } from "../../utils/contentfulClient";
import { Box } from "@mui/material";

export default function CommentBox() {
  const subjectId = useParams();
  const [comments, setComments] = useState([]);

  useEffect(() => {
    contentfulClient
      .getEntries({
        content_type: "comment",
        order: "sys.createdAt",
      })
      .then((response) => {
        const filtered = response.items.filter((item) => {
          return item.fields.parentPostId === subjectId.blogItemid;
        });
        console.log(filtered, "filtered");
        setComments(filtered);
      })
      .catch((err) => console.error(err));
  }, [subjectId]);

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "900px",
        display: "flex",
        flexDirection: "column",
        padding: "1rem",
      }}
    >
      <CommentList comments={comments} />
      <CommentForm
        subjectId={subjectId}
        comments={comments}
        setComments={setComments}
      />
    </Box>
  );
}
