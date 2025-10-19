import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import "./styles/About.css";

const TypingText = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  const sentenceVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        delay: delay,
        staggerChildren: 0.02,
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, display: "none" },
    visible: {
      opacity: 1,
      display: "inline",
    },
  };

  return (
    <motion.p
      ref={ref}
      variants={sentenceVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {text.split("").map((char, index) => (
        <motion.span key={`${char}-${index}`} variants={letterVariants}>
          {char}
        </motion.span>
      ))}
      <motion.span
        className="typing-cursor"
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
      >
        |
      </motion.span>
    </motion.p>
  );
};

const About = () => {
  return (
    <div className="about-section" id="about">
      <div className="about-me">
        <h3 className="title">About Me</h3>
        <div className="text-content">
          <TypingText
            text="I am Kalpick Sharma, an aspiring Software Development Engineer (SDE) and a Freelance Graphic Designer with a B.Tech in Computer Science."
            delay={0.5}
          />
          <TypingText
            text="With 3 years of experience in logo design, I craft impactful brand identities showcased on Instagram, Dribbble, and Pinterest."
            delay={2.5}
          />
          <TypingText
            text="I am passionate about Web3, cybersecurity, and IoT technologies, and currently advancing my skills in front-end web development."
            delay={4.5}
          />
        </div>
      </div>
    </div>
  );
};

export default About;
