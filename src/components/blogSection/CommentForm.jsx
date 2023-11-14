import React from "react";
import { Box, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { createClient } from "contentful-management";
import { useParams } from "react-router-dom";
import createComment from "../../utils/createComment";
const commentsClient = createClient({
  accessToken: import.meta.env.VITE_CREATE_POST_COMMENT,
});

export default function CommentForm() {
  const subjectId = useParams();
  console.log(subjectId);

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
        // "& > :not(style)": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit(submit)}
    >
      <Box display={"flex"}>
        <Typography fontWeight={"bold"} fontSize={"inherit"} textAlign={"left"}>
          Your Name:
        </Typography>
        <input
          {...register("commentAuthor", { required: true, maxLength: 100 })}
          defaultValue="test"
        />
      </Box>
      <Box display={"flex"}>
        <Typography fontWeight={"bold"} fontSize={"inherit"} textAlign={"left"}>
          Comment:
        </Typography>
        <textarea
          rows="4"
          cols="50"
          {...register("commentBody", { required: true, maxLength: 1000 })}
        />
      </Box>
      <input type="submit" />
    </Box>
  );
}
