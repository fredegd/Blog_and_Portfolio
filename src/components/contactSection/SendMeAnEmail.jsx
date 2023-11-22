import { useRef } from "react";
import emailjs from "@emailjs/browser";
import { Box, Typography, Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import { useForm } from "react-hook-form";

import { useTheme } from "@mui/material";

export default function SendMeAnEmail() {
  const theme = useTheme();
  const form = useRef();

  const sendEmail = () => {
    // emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', form.current, 'YOUR_PUBLIC_KEY')
    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        form.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      from_name: "",
      from_email: "",
      message: "",
    },
  });
  const submit = (data) => {
    // alert(JSON.stringify(data));
    const dataToSubmit = {
      from_name: data.from_name,
      from_email: data.from_email,
      message: data.message,
    };
    console.log(dataToSubmit);
    console.log(form.current, "form");
    sendEmail(dataToSubmit);

    reset();
  };
  return (
    <>
      <Box
        component="form"
        ref={form}
        sx={{
          width: { xs: "100%", lg: "50%" },
          height: "35rem",

          padding: "1rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          gap: "0.5rem",
          backgroundColor: `${theme.palette.background.main}88`,
          boxShadow: `0 0 10px ${theme.palette.text.highlightAlt}}`,
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
        <Typography variant="h5" my={3}>
          Drop me an email:
        </Typography>

        <Box display={"flex"}>
          <TextField
            {...register("from_name", { required: true, maxLength: 100 })}
            id="filled-basic"
            label="Your Name"
            fullWidth
            sx={{ backgroundColor: theme.palette.background.main }}
          />
        </Box>
        <Box display={"flex"}>
          <TextField
            {...register("from_email", { required: true, maxLength: 100 })}
            id="filled-basic"
            label="Your email"
            fullWidth
            sx={{ backgroundColor: theme.palette.background.main }}
          />
        </Box>
        <Box display={"flex"}>
          <TextField
            {...register("message", { required: true, maxLength: 1000 })}
            // id="outlined-multiline-static"
            label="Message:"
            multiline
            rows={3}
            defaultValue="Default Value"
            fullWidth
            sx={{
              backgroundColor: theme.palette.background.main,
              "&:focus": {
                boxShadow: `${(theme.palette.text.primary, 0.25)} 0 0 0 0.2rem`,
                borderColor: theme.palette.text.primary,
              },
            }}
          />
        </Box>
        <Button
          type="submit"
          variant="outlined"
          sx={{
            backgroundColor: theme.palette.background.main,

            color: theme.palette.text.primary,
            border: `2px solid ${theme.palette.text.highlightAlt}`,
            "&:hover": {
              backgroundColor: theme.palette.text.highlightAlt,
              border: `2px solid ${theme.palette.text.highlightAlt}`,

              color: theme.palette.background.main,
            },
          }}
        >
          Submit
        </Button>
      </Box>
    </>
  );

  //   return (
  //     <Box>
  //       <Typography variant="h1">Send me an Email:</Typography>
  // 	  <Box
  // 	  component={'form'}>

  // 	  </Box>
  //       <form ref={form} onSubmit={sendEmail}>
  //         <label>Name</label>
  //         <input type="text" name="from_name" />
  //         <label>Email</label>
  //         <input type="email" name="from_email" />
  //         <label>Message</label>
  //         <textarea name="message" />
  //         <input type="submit" value="Send" />
  //       </form>
  //     </Box>
  //   );
}
