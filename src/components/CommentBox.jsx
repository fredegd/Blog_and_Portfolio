import { useForm } from "react-hook-form";
import { Box } from "@mui/material";
import { useState, useEffect } from "react";

import { createClient } from "contentful-management";

import { client } from "../client";

const commentsClient = createClient({
  accessToken: import.meta.env.VITE_CREATE_POST_COMMENT,
});

export default function CommentBox({ subjectId }) {
  console.log();
  console.log(subjectId);

  const [comments, setComments] = useState([]);

  useEffect(() => {
    client
      .getEntries({
        content_type: "comment",
      })
      .then((response) => {
        const filtered = response.items.filter((item) => {
          return item.fields.parentPostId === subjectId;
        });
        console.log(filtered);
        setComments(filtered);
      })
      .catch((err) => console.error(err));
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      commentAuthor: "",
      commentBody: "",
    },
  });
  const submit = (data) => {
    // alert(JSON.stringify(data));
    console.log(data);

    commentsClient
      .getSpace(import.meta.env.VITE_SPACE_ID)
      .then((space) => space.getEnvironment(import.meta.env.VITE_ENVIRONMENT))
      .then((environment) =>
      environment.createEntry("comment", {
        fields: {
          commentAuthor: { "en-US": data.commentAuthor }, // Adjust the locale if needed
          commentBody: { "en-US": data.commentBody }, // Adjust the locale if needed
          parentPostId: { "en-US": subjectId }, // Adjust the locale if needed
          parentCommentId: { "en-US": "" }, // Adjust the locale if needed
        },
      })      
      )
      .then((entry) => console.log(entry))
      .catch(console.error);

    reset();
  };

  return (
    <Box sx={{ width: "100%" }}>
      <br />

      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <h1>Comments</h1>
        {comments.map((comment) => {
          const createdAt = new Date(
            comment.sys.createdAt
          ).toLocaleDateString();

          return (
            <Box
              key={comment.sys.id}
              sx={{ display: "flex", flexDirection: "row", gap: "3rem" }}
            >
              <p>
                {comment.fields.commentAuthor}
                <span>
                  {", "}
                  {createdAt}
                </span>
              </p>
              <p>{comment.fields.commentBody}</p>
            </Box>
          );
        })}
      </Box>
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(submit)}
      >
        <label>Comment</label>
        <input
          {...register("commentBody", { required: true, maxLength: 1000 })}
        />
        <label>Your Name: </label>
        <input
          {...register("commentAuthor", { required: true, maxLength: 100 })}
          defaultValue="test"
        />
        <input type="submit" />
      </Box>
    </Box>
  );
}
