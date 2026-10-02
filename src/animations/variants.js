const isReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const fadeIn = (direction = "up", delay = 0) => {
  if (isReducedMotion()) {
    return {
      hidden: { opacity: 0 },
      show: { opacity: 1, transition: { duration: 0.2, delay } },
    };
  }
  return {
    hidden: {
      y: direction === "up" ? 24 : direction === "down" ? -24 : 0,
      x: direction === "left" ? 24 : direction === "right" ? -24 : 0,
      opacity: 0,
    },
    show: {
      y: 0,
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        duration: 0.6,
        delay: delay,
        ease: [0.25, 0.25, 0.25, 0.75],
      },
    },
  };
};

export const staggerContainer = (staggerChildren = 0.1, delayChildren = 0) => {
  return {
    hidden: {},
    show: {
      transition: {
        staggerChildren: isReducedMotion() ? 0 : staggerChildren,
        delayChildren,
      },
    },
  };
};

export const scaleUp = (delay = 0) => {
  if (isReducedMotion()) {
    return {
      hidden: { opacity: 0 },
      show: { opacity: 1, transition: { duration: 0.2, delay } },
    };
  }
  return {
    hidden: { scale: 0.95, opacity: 0 },
    show: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.4,
        delay,
        ease: "easeOut",
      },
    },
  };
};

export const floatAnimation = {
  initial: { y: 0 },
  animate: isReducedMotion()
    ? { y: 0 }
    : {
        y: [-4, 4, -4],
        transition: {
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        },
      },
};

export const slideIn = (direction = "left", delay = 0) => ({
  hidden: {
    x: direction === "left" ? -30 : direction === "right" ? 30 : 0,
    y: direction === "up" ? 30 : direction === "down" ? -30 : 0,
    opacity: 0,
  },
  show: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 20,
      delay,
    },
  },
});

export const textReveal = {
  hidden: { opacity: 0, y: 15 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.04,
      duration: 0.4,
      ease: [0.2, 0.65, 0.3, 0.9],
    },
  }),
};

export const badgePulse = {
  initial: { scale: 1, opacity: 0.8 },
  animate: {
    scale: [1, 1.08, 1],
    opacity: [0.8, 1, 0.8],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

