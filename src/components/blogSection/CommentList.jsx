import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useTheme } from "@mui/material";

import { Typography, Box, IconButton } from "@mui/material";
import ReplyIcon from "@mui/icons-material/Reply";
import { contentfulClient } from "../../utils/contentfulClient";

import { createClient } from "contentful-management";

const commentsClient = createClient({
  accessToken: import.meta.env.VITE_CREATE_POST_COMMENT,
});

function reply(comment) {
  return console.log(comment)
}

export default function CommentList() {
  const theme = useTheme();
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
        // console.log(filtered);
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
      {comments.map((comment, index) => {
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
              padding: "1rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              gap: "0.5rem",
              backgroundColor: theme.palette.background.main,
              boxShadow: "0 0 10px rgba(0,0,0,0.5)",
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
                {":"}
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
                alignItems: "flex-start",

              }}
            >
              <Typography fontSize={"inherit"} textAlign={"left"}>
                {comment.fields.commentBody}
              </Typography>
            </Box>
           {/* { <IconButton
              sx={{ width: "2rem", height: "2rem" }}
              onClick={reply(comment)}
            >
              <ReplyIcon />
            </IconButton>} */}
          </Box>
        );
      })}
    </Box>
  );
}
