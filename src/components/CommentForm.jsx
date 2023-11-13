import React from "react";
import { Box, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { createClient } from "contentful-management";
import { useParams } from "react-router-dom";

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
    console.log(data);

    commentsClient
      .getSpace(import.meta.env.VITE_SPACE_ID)
      .then((space) => space.getEnvironment(import.meta.env.VITE_ENVIRONMENT))
      .then((environment) =>
        environment.createEntry("comment", {
          fields: {
            commentAuthor: { "en-US": data.commentAuthor }, // Adjust the locale if needed
            commentBody: { "en-US": data.commentBody }, // Adjust the locale if needed
            parentPostId: { "en-US": subjectId.blogItemid }, // Adjust the locale if needed
            parentCommentId: { "en-US": "" }, // Adjust the locale if needed
          },
        })
      )
      .then((entry) => entry.publish())
      .then((entry) => console.log(entry))
      .catch(console.error);

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
