import { Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Landing from "./components/homeSection/Landing";
import Navbar from "./components/Navbar";
import Projects from "./components/worksSection/Projects";
import ProjectItem from "./components/worksSection/ProjectItem";
import About from "./components/aboutSection/About";
import Blog from "./components/blogSection/Blog";
import BlogItem from "./components/blogSection/BlogItem";
import Contact from "./components/contactSection/Contact";
import DrawerBGChange from "./components/BGpatternUI/DrawerBGChange";
import Kaleidoscope from "./components/Kaleidoscope";
import { contentfulClient } from "./utils/contentfulClient.js";

import { colorsToChooseFrom } from "./colorsToChooseFrom";
import "./App.css";

// import DarkModeProvider from "./context/DarkModeContext";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import { themeManager } from "./theme";
import { useDarkMode } from "./context/DarkModeContext.jsx";

export default function App() {
  const { dk } = useDarkMode();
  const theme = themeManager(dk);
  const isFirefox =
    typeof window !== "undefined" &&
    window.navigator.userAgent.toLowerCase().indexOf("firefox") > -1;

  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

  // const [blogs, setBlogs] = useState([]);
  const [works, setWorks] = useState([]); // [TODO] - Add works to state
  const [staticBg, setStaticBg] = useState(isFirefox ? true : false);
  const [opacity, setOpacity] = useState(
    localStorage.getItem("opacity") ? localStorage.getItem("opacity") : 0.5
  );

  const [bgImage, setBgImage] = useState(
    localStorage.getItem("svgData") ? localStorage.getItem("svgData") : null
  );
  const [open, setOpen] = useState(false); //a state to control the navbar drawer
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      if (isFirefox || isSafari) {
        setStaticBg(true);
      } else {
        setStaticBg(false);
      }
    } else {
      console.log(location.pathname, "is not /");
      setStaticBg(true);
    }
  }, [location.pathname, isFirefox]);
  const getRandomHexColor = (colName) => {
    // const hexChars = "0123456789abcdef";
    // let color = "#";
    // for (let i = 0; i < 6; i++) {
    //   const randomIndex = Math.floor(Math.random() * hexChars.length);
    //   color += hexChars[randomIndex];
    // }
    const randomIndex = Math.floor(Math.random() * colorsToChooseFrom.length);
    const color = colorsToChooseFrom[randomIndex].value;
    localStorage.setItem(colName, color);
    // console.log(color, " was chosen");

    return color;
  };
  const [color1, setColor1] = useState(
    localStorage.getItem("col1")
      ? localStorage.getItem("col1")
      : getRandomHexColor("col1")
  );
  const [color2, setColor2] = useState(
    localStorage.getItem("col2")
      ? localStorage.getItem("col2")
      : getRandomHexColor("col2")
  );

  useEffect(() => {
    contentfulClient
      .getEntries({
        content_type: "fredegdBlog",
      })
      .then((response) => {
        setBlogs(response.items);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    contentfulClient
      .getEntries({
        content_type: "fredegdProjects",
      })
      .then((response) => {
        setWorks(response.items);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline enableColorScheme>
          <Navbar setOpen={setOpen} />
          <DrawerBGChange
            bgImage={bgImage}
            setBgImage={setBgImage}
            color1={color1}
            color2={color2}
            setColor1={setColor1}
            setColor2={setColor2}
            open={open}
            setOpen={setOpen}
            opacity={opacity}
            setOpacity={setOpacity}
          />{" "}
          <Kaleidoscope
            bgImage={bgImage}
            staticBg={staticBg}
            opacity={opacity}
          />
          <Routes>
            <Route path="/works" element={<Projects />} />
            <Route path="/works/read/:projectId" element={<ProjectItem />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/read/:blogItemid" element={<BlogItem />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />

            <Route path="/" element={<Landing works={works} />} />
          </Routes>
        </CssBaseline>
      </ThemeProvider>
    </>
  );
}
