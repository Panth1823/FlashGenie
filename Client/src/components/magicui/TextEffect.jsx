"use client";
import { motion } from "framer-motion";
import React, { memo } from "react";
import PropTypes from "prop-types";

const defaultContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const defaultItemVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
  },
};

const presetVariants = {
  blur: {
    container: defaultContainerVariants,
    item: {
      hidden: { opacity: 0, filter: "blur(12px)" },
      visible: { opacity: 1, filter: "blur(0px)" },
    },
  },
  shake: {
    container: defaultContainerVariants,
    item: {
      hidden: { x: 0 },
      visible: { x: [-5, 5, -5, 5, 0], transition: { duration: 0.5 } },
    },
  },
  scale: {
    container: defaultContainerVariants,
    item: {
      hidden: { opacity: 0, scale: 0 },
      visible: { opacity: 1, scale: 1 },
    },
  },
  fade: {
    container: defaultContainerVariants,
    item: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    },
  },
  slide: {
    container: defaultContainerVariants,
    item: {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 },
    },
  },
};

const AnimationComponent = memo(({ word, variants, per }) => {
  if (per === "word") {
    return (
      <motion.span
        aria-hidden="true"
        variants={variants}
        className="inline-block whitespace-pre"
      >
        {word}
      </motion.span>
    );
  }

  return (
    <span className="inline-block whitespace-pre">
      {word.split("").map((char, charIndex) => (
        <motion.span
          key={`char-${charIndex}`}
          aria-hidden="true"
          variants={variants}
          className="inline-block whitespace-pre"
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
});

AnimationComponent.displayName = "AnimationComponent";
AnimationComponent.propTypes = {
  word: PropTypes.string.isRequired,
  variants: PropTypes.object.isRequired,
  per: PropTypes.oneOf(["word", "char"]).isRequired,
};

export function TextEffect({
  children,
  per = "word",
  as = "p",
  variants,
  className,
  preset,
}) {
  const words = children.split(/(\S+)/);
  const MotionTag = motion[as];
  const selectedVariants = preset
    ? presetVariants[preset]
    : { container: defaultContainerVariants, item: defaultItemVariants };
  const containerVariants = variants?.container || selectedVariants.container;
  const itemVariants = variants?.item || selectedVariants.item;

  return (
    <MotionTag
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className={className}
    >
      {words.map((word, wordIndex) => (
        <AnimationComponent
          key={`word-${wordIndex}`}
          word={word}
          variants={itemVariants}
          per={per}
        />
      ))}
    </MotionTag>
  );
}

TextEffect.propTypes = {
  children: PropTypes.string.isRequired,
  per: PropTypes.oneOf(["word", "char"]),
  as: PropTypes.oneOfType([
    PropTypes.string, // e.g., 'p', 'h1', etc.
    PropTypes.elementType, // for custom components
  ]),
  variants: PropTypes.shape({
    container: PropTypes.object,
    item: PropTypes.object,
  }),
  className: PropTypes.string,
  preset: PropTypes.oneOf(["blur", "shake", "scale", "fade", "slide"]),
};

TextEffect.defaultProps = {
  per: "word",
  as: "p",
  variants: null,
  className: "",
  preset: null,
};
