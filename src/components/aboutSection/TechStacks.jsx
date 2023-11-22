import React from "react";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
import anime from "animejs";

const stackIcons = [
  //html
  { name: "html", icon: <i className="devicon-html5-plain" /> },
  //css
  { name: "css", icon: <i className="devicon-css3-plain" /> },
  //javascript
  { name: "javascript", icon: <i className="devicon-javascript-plain" /> },
  //typescript
  { name: "typescript", icon: <i className="devicon-typescript-plain" /> },
  //react
  { name: "react", icon: <i className="devicon-react-original" /> },
  //node js
  { name: "nodejs", icon: <i className="devicon-nodejs-plain" /> },
  //express
  { name: "express", icon: <i className="devicon-express-original" /> },
  //postgresql
  { name: "postgresql", icon: <i className="devicon-postgresql-plain" /> },
  //mysql
  { name: "mysql", icon: <i className="devicon-mysql-plain" /> },
  //mongodb
  { name: "mongodb", icon: <i className="devicon-mongodb-plain" /> },
  //bootstrap
  { name: "bootstrap", icon: <i className="devicon-bootstrap-plain" /> },
  //material ui
  { name: "materialui", icon: <i className="devicon-materialui-plain" /> },
  // tailwind
  { name: "tailwind", icon: <i className="devicon-tailwindcss-plain" /> },
  //sass
  { name: "sass", icon: <i className="devicon-sass-original" /> },

  //Java
  { name: "java", icon: <i className="devicon-java-plain" /> },
  //processing
  { name: "processing", icon: <i className="devicon-processing-plain"></i> },

  //gitHub
  { name: "github", icon: <i className="devicon-github-original" /> },
  //heroku
  { name: "heroku", icon: <i className="devicon-heroku-original" /> },

  //vscode
  { name: "vscode", icon: <i className="devicon-vscode-plain" /> },
  //npm
  { name: "npm", icon: <i className="devicon-npm-original-wordmark" /> },
  //yarn
  { name: "yarn", icon: <i className="devicon-yarn-plain" /> },

  //trello
  { name: "trello", icon: <i className="devicon-trello-plain" /> },

  //figma
  { name: "figma", icon: <i className="devicon-figma-plain" /> },
  //inkscape
  { name: "inkscape", icon: <i className="devicon-inkscape-plain" /> },
  //adobe illustrator
  { name: "illustrator", icon: <i className="devicon-illustrator-plain" /> },
  //adobe photoshop
  { name: "photoshop", icon: <i className="devicon-photoshop-plain" /> },
  //adobe xd
  { name: "xd", icon: <i className="devicon-xd-plain" /> },

  //slack
  { name: "slack", icon: <i className="devicon-slack-plain" /> },
];
export default function TechStacks() {
  const theme = useTheme();

  // anime({
  //   targets: ".loop-infinity",
  //   translateX: [
  //     `${Math.min(window.innerWidth, 1280)}`,
  //     `${-stackIcons.length * 129 - Math.min(window.innerWidth, 1280)}px`,
  //   ],
  //   delay: function(el, i) { return i * 10 },

  //   duration: 18000,

  //   loop: true,
  //   easing: "easeInOutSine",
  // });

  return (
    <Box
      sx={{
        marginTop: "5rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",

        maxWidth: { xs: "100vw", md: "80vw", lg: "1280px" },
        overflowX: "hidden",
        zIndex: "1000",
      }}
    >
      <Typography variant="h1" sx={{ fontWeight: "bold" }}>
        Tech-Stacks:
      </Typography>

      <Box
        sx={{
          padding: "1rem",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          maxWidth: "100vw",
          // overflowX: "hidden",

          gap: "1rem",
          zIndex: "1000",
        }}
      >
        {stackIcons.map((icon, index) => {
          return (
            <Box
              key={index}
              className="loop-infinity"
              sx={{
                backgroundColor: `${theme.palette.text.highlightAlt}cc`,
                color: theme.palette.text.highlight,
                // margin: "2rem 0 5rem 0",
                borderRadius: "20%",
                padding: "0.8rem",
                minWidth: "8rem",
                height: "8rem",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                // boxShadow: `0px 0px 10px 1px ${theme.palette.text.primary}}`,
              }}
            >
              <Typography variant="h1">{icon.icon}</Typography>
              <Typography variant="p" fontSize={"1rem"}>
                {icon.name}
              </Typography>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
