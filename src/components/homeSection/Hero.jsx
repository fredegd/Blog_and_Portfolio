import Typewriter from "typewriter-effect";
import { Box } from "@mui/system";
import { keyframes } from "@mui/system";

import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

const slideIn0 = keyframes`
  0% {
    transform: translateY(25%);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;
const slideIn1 = keyframes`
  0% {
    transform: translateY(100%);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;
const slideIn2 = keyframes`
  0% {
    transform: translateY(200%);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;

export default function Hero() {
  const theme = useTheme();
  return (
    <Box
      id="hero"
      sx={{
        // fontFamily: "IBM Plex Mono, sans-serif",
        fontSize: {
          xs: "1.2rem",
          sm: "1.5rem",
          md: "1.8rem",
          lg: "2.1rem",
          xl: "2.5rem",
        },
        width: { xs: "100%", sm: "100%", md: "100%", lg: "100%", xl: "100%" },
        minHeight: "90vh",
        background: `
        linear-gradient(90deg,  transparent 10%,  ${theme.palette.background.main}cc 50%, transparent 90%)`,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        overflow: "scroll",
        transition: "all 0.5s ease-in-out",
        zIndex: "100",
      }}
    >
      <Box
        sx={{
          animation: `${slideIn1} .5s ease-out 0s 1`,
          height: { xs: "10rem", md: "12rem" },
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: `linear-gradient(transparent 0%, ${theme.palette.background.main}88 25%, ${theme.palette.background.main}88 75%, transparent 100%)`,
        }}
      >
        <Typography variant="h6" mb={4}>👋 Hi, My name is:</Typography>
        <Typography
          variant="h1"
          sx={{
            fontSize: {
              xs: "3.2em",
              sm: "3.5em",
              md: "3.8em",
              lg: "4.0em",
              xl: "4.0em",
            },
          }}
        >
          FRED EGIDI
        </Typography>
      </Box>

      <Box
        sx={{
          animation: `${slideIn2} 1.2s ease-out 0s 1`,
          height: { xs: "10rem", md: "12rem" },
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: `linear-gradient(transparent 0%, ${theme.palette.background.main}88 25%, ${theme.palette.background.main}88 75%, transparent 100%)`,
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontSize: {
              xs: "2.0em",
              sm: "2.2em",
              md: "2.3em",
              lg: "2.3em",
              xl: "2.3em",
            },
          }}
        >
          <Typewriter
            options={{
              loop: true,
              // delay: "natural",
              delay: 80,
              deleteSpeed: 20,
            }}
            onInit={(typewriter) => {
              typewriter
                .pauseFor(400)
                .typeString("Full Stack")
                .pauseFor(100)
                .typeString(" Web Devellper")
                .deleteChars(4)
                .pauseFor(100)
                .typeString("oper")
                .pauseFor(1000)
                .deleteAll()
                .typeString("Creative ")
                .pauseFor(100)
                .typeString("Coder ")
                .pauseFor(1000)
                .deleteChars(9)
                .pauseFor(200)
                .typeString("ve Human")
                .pauseFor(200)
                .typeString(" Being ")
                .pauseFor(850)
                .deleteChars(22)
                .typeString("Based in Berlin ")
                .pauseFor(200)
                .typeString("Germany")
                .pauseFor(1000)
                .start();
            }}
          />
        </Typography>
      </Box>
    </Box>
  );
}
