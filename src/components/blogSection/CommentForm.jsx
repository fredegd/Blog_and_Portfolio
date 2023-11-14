import React from "react";
import { Box, Typography, Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";

import { useForm } from "react-hook-form";
import { useTheme } from "@mui/material";
import { createClient } from "contentful-management";
import { useParams } from "react-router-dom";
import createComment from "../../utils/createComment";
const commentsClient = createClient({
  accessToken: import.meta.env.VITE_CREATE_POST_COMMENT,
});

export default function CommentForm() {
  const theme = useTheme();
  const subjectId = useParams();
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
    const dataToSubmit = {
      commentAuthor: data.commentAuthor,
      commentBody: data.commentBody,
      parentPostId: subjectId.blogItemid,
      parentCommentId: null,
    };
    console.log(dataToSubmit);

    createComment(dataToSubmit);

    reset();
  };
  return (
    <Box
      component="form"
      sx={{
        marginTop: "3rem",
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
        // "& > :not(style)": { m: 1 },
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit(submit)}
    >
      <Box display={"flex"}>
        <TextField
          {...register("commentAuthor", { required: true, maxLength: 100 })}
          id="filled-basic"
          label="Your Name"
          variant="filled"
          fullWidth
        />
      </Box>
      <Box display={"flex"}>
        <TextField
          {...register("commentBody", { required: true, maxLength: 1000 })}
          id="outlined-multiline-static"
          label="Comment"
          multiline
          rows={3}
          defaultValue="Default Value"
          fullWidth
        />
      </Box>
      <Button type="submit" variant="outlined">
        Submit
      </Button>
    </Box>
  );
}
