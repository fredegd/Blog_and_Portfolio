import React from 'react'
import { motion, useScroll } from "framer-motion";
import { useTheme } from "@mui/material/styles";


export default function ScrollIndicator() {
    const theme = useTheme();
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
          className="progress-bar"
          style={{
            zIndex: "1000",
            scaleX: scrollYProgress,
            position: "fixed",
            bottom: "1.5rem",
            left: 0,
            right: 0,
            height: "2.5rem",
            transformOrigin: "0%",
            background: theme.palette.text.highlightAlt,
            opacity: 0.8,
          }}
        />
  )
}
