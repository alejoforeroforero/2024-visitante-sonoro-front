import { motion } from 'framer-motion';

const pageVariants = {
  initial: {
    opacity: 0,
    y: '0',
  },
  in: {
    opacity: 1,
    y: 0,

  },
  out: {
    opacity: 0,
    y: '0',
  }
};

const pageTransitions = {
  default: {
    type: 'tween',
    ease: 'anticipate',
    duration: 2
  },
  smooth: {
    type: 'tween',
    ease: 'easeInOut',
    duration: 2
  },
  spring: {
    type: 'spring',
    stiffness: 100,
    damping: 20
  },
  bounce: {
    type: 'spring',
    stiffness: 300,
    damping: 10
  },
  slow: {
    type: 'tween',
    ease: 'circIn',
    duration: 1.5
  },
  stagger: {
    type: 'tween',
    ease: 'easeOut',
    duration: 0.5,
    staggerChildren: 0.2
  }
};

const PageTransitionWrapper = ({ children, transitionType = 'smooth' }) => {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransitions[transitionType]}
    >
      {children}
    </motion.div>
  );
};

export default PageTransitionWrapper;