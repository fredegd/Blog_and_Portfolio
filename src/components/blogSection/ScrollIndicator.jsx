import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { useMotionValueEvent } from "framer-motion";

import { useTheme } from "@mui/material/styles";

export default function ScrollIndicator() {
  const ref = useRef(null);
  const reference = document.querySelector(".blog-content");

  const theme = useTheme();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // useMotionValueEvent(scrollYProgress, "change", (latest) => {
  //   console.log("Page scroll: ", latest);
  // });

  return (
    <div>
      <motion.div
        className="progress-bar"
        style={{
          zIndex: "1000",
          scaleX: scaleX,
          position: "fixed",
          bottom: "0",
          left: 0,
          right: 0,
          height: "100vh",
          transformOrigin: "0%",
          background: theme.palette.text.highlight,
          // opacity: 0.3,
          borderRight: `3px solid ${theme.palette.text.highlightAlt}`,
        }}
      ></motion.div>{" "}
    </div>
  );
}
