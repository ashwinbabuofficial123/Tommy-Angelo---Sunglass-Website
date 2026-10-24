import { motion } from "motion/react";
import "../css/textTransform.css";

const TextTransform = ({ text }) => {
  const transition = { duration: 0.35, ease: "easeInOut" };

  const motionWrap = {
    rest: {},
    hover: {},
  };

  // first span: leaves upward
  const firstSpan = {
    rest: { y: 0, opacity: 1, transition },
    hover: { y: -20, opacity: 0, transition },
  };

  // second span: arrives from below
  const secondSpan = {
    rest: { y: 20, opacity: 0, transition },
    hover: { y: 0, opacity: 1, transition },
  };

  return (
    <motion.div
      className="hover"
      variants={motionWrap}
      initial="rest"
      whileHover="hover"
    >
      <motion.span className="text first" variants={firstSpan}>
        {text}
      </motion.span>
      <motion.span className="text second" variants={secondSpan}>
        {text}
      </motion.span>
    </motion.div>
  );
};

export default TextTransform;
