import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { Typography, Box } from "@mui/material";
import { client } from "../client";

import { createClient } from "contentful-management";

const commentsClient = createClient({
  accessToken: import.meta.env.VITE_CREATE_POST_COMMENT,
});

export default function CommentList() {
  const subjectId = useParams();
  const [comments, setComments] = useState([]);

  useEffect(() => {
    client
      .getEntries({
        content_type: "comment",
      })
      .then((response) => {
        const filtered = response.items.filter((item) => {
          return item.fields.parentPostId === subjectId.blogItemid;
        });
        console.log(filtered);
        setComments(filtered);
      })
      .catch((err) => console.error(err));
  }, []);

  return comments.length == 0 ? (
    <>{"Write a comment"}</>
  ) : (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Typography variant="h4" textAlign={"left"} mb={3}>
        Comments:
      </Typography>
      {comments.map((comment,index) => {
        // const createdAt = new Date(comment.sys.createdAt).toLocaleDateString().getTime();
        // const currentDateTime = new Date().getTime();
        // const timeDifference = currentDateTime - createdAt;
        // console.log(timeDifference)
        // const ageInMinutes = Math.floor(timeDifference / 60000);
        // const ageInHours = Math.floor(timeDifference / 3600000);
        // const ageInDays = Math.floor(ageInHours / 24);
        // const ageInWeeks = Math.floor(ageInDays / 7);

        // let commentAge = "";
        // if (ageInWeeks > 0) {
        //   commentAge = `${ageInWeeks} week${ageInWeeks > 1 ? "s" : ""} ago`;
        // } else if (ageInDays > 0) {
        //   commentAge = `${ageInDays} day${ageInDays > 1 ? "s" : ""} ago`;
        // } else if (ageInHours > 0) {
        //   commentAge = `${ageInHours} hour${ageInHours > 1 ? "s" : ""} ago`;
        // } else {
        //   commentAge = `${ageInMinutes} minute${ageInMinutes > 1 ? "s" : ""} ago`;
        // }

        return (
          <Box
            key={index}
            sx={{
              marginBottom: "2rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              gap: "0.5rem",
              boxShadow: "0 0 10px rgba(0,0,0,0.5)",
              padding: "1rem",
              borderRadius: "1rem",
              fontSize: {
                xs: "1.2rem",
                sm: "1.3rem",
                md: "1.4rem",
                lg: "1.5rem",
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                height: "2rem",
              }}
            >
              <Typography fontWeight={"bold"} fontSize={"inherit"}>
                {comment.fields.commentAuthor}
              </Typography>
              {/* <Typography
                fontWeight={"bold"}
                fontSize={"inherit"}
                textAlign={"right"}
                flexGrow={1}
              >
                {commentAge}
              </Typography> */}
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                height: "2rem",
              }}
            >
              <Typography fontSize={"inherit"}>
                {comment.fields.commentBody}
              </Typography>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}
