import React from "react";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
import anime from "animejs";


const stackIcons = [
  //html
  <i className="devicon-html5-plain" />,
  //css
  <i className="devicon-css3-plain" />,
  //javascript
  <i className="devicon-javascript-plain" />,
  //typescript
  <i className="devicon-typescript-plain" />,
  //react
  <i className="devicon-react-original" />,
  //node js
  <i className="devicon-nodejs-plain" />,
  //express
  <i className="devicon-express-original" />,
  //postgresql
  <i className="devicon-postgresql-plain" />,
  //mysql
  <i className="devicon-mysql-plain" />,
  //mongodb
  <i className="devicon-mongodb-plain" />,
  //bootstrap
  <i className="devicon-bootstrap-plain" />,
  //material ui
  <i className="devicon-materialui-plain" />,
  // tailwind
  <i className="devicon-tailwindcss-plain" />,
  //sass
  <i className="devicon-sass-original" />,

  //Java
  <i className="devicon-java-plain" />,
  //processing
  <i className="devicon-processing-plain" />,

  //gitHub
  <i className="devicon-github-original" />,
  //heroku
  <i className="devicon-heroku-original" />,

  //vscode
  <i className="devicon-vscode-plain" />,
  //npm
  <i className="devicon-npm-original-wordmark" />,
  //yarn
  <i className="devicon-yarn-plain" />,

  //trello
  <i className="devicon-trello-plain" />,

  //figma
  <i className="devicon-figma-plain" />,
  //inkscape
  <i className="devicon-inkscape-plain" />,
  //adobe illustrator
  <i className="devicon-illustrator-plain" />,
  //adobe photoshop
  <i className="devicon-photoshop-plain" />,
  //adobe xd
  <i className="devicon-xd-plain" />,

  //slack
  <i className="devicon-slack-plain" />,
];
export default function TechStacks() {
  const theme = useTheme();

  


  anime({
    targets: '.loop-infinity',
    translateX: [`${Math.min(window.innerWidth,1280)}`, `${ -stackIcons.length*125-Math.min(window.innerWidth,1280)}px`],
    // delay: function(el, i) { return i * 150 },


    duration: 18000,

    loop: true,
    easing: 'easeInOutSine'
  });

  return (
    <Box

      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",

        maxWidth: {xs:"100vw", md:"80vw", lg:"1280px"},



        zIndex: "1000",
      }}
    >
      <Typography variant="h1" 
      sx={{fontWeight:"bold"}}>
      Tech-Stacks:
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          maxWidth: "100vw",
          overflowX: "scroll",

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
                backgroundColor: theme.palette.background.main,
                color: theme.palette.text.highlight,
                margin: "2rem 0 5rem 0",
                borderRadius: "20%",
                padding: "1rem",
                minWidth: "8rem",
                height: "8rem",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                boxShadow: `0px 0px 10px 1px ${theme.palette.text.highlight}}`,
              }}
            >
              <Typography variant="h1">{icon}</Typography>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
