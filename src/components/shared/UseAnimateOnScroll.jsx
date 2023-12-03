import { useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

export const useAnimateOnScroll = (inView) => {
  const parentRef = useRef(null);
  const control = useAnimation();

  const isInView = useInView(parentRef, {
    once: false,
    amount: inView,
  });

  useEffect(() => {
    if (!parentRef.current) {
      return;
    }
    if (isInView) {
      control.start("visible");
    } else {
      const { bottom } = parentRef.current.getBoundingClientRect();
      const top = parentRef.current.getBoundingClientRect().top;
      const isAboveScreenTop = top < 50;
      const isBelowScreenBottom = bottom > window.innerHeight;
      if (isBelowScreenBottom) {
        control.start("hidden");
      }
      if (isAboveScreenTop) {
        control.start("hidden");
      }
    }
  }, [isInView, control]);

  return {
    parentRef,
    control,
  };
};
