import "./About.css";
import { motion } from "framer-motion";
import { useTheme } from "@mui/material";

export default function About() {
  const theme = useTheme();

  const sections = [
    {
      title: "About Us",
      text: `At Nelly, it’s all about making life easier, smarter, and more
      enjoyable. We created Nelly as a place where you can slow down,
      explore, and discover what matters most to you.`,
      img: "/images/about.avif",
    },
    {
      title: "Our Values",
      text: `At Nelly, we believe in quality without compromise. Every product we offer is selected with care and meant to bring joy to your everyday life.`,
      img: "/images/value.avif",
    },
    {
      title: "Our Culture",
      text: `We’re more than just electronics. We’re about people, community, and creating experiences that feel reliable and welcoming.`,
      img: "/images/culture.avif",
    },
    {
      title: "Our Ambition",
      text: `We set new standards in everything we do—from choosing our partners to the moment our product reaches your hands.`,
      img: "/images/ambition.avif",
    },
  ];

  const imgVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut", delay: 0.2 },
    },
  };

  return (
    <div
      className="about-page"
      style={{
        "--bg": theme.palette.background.default,
        "--card-bg": theme.palette.background.paper,
        "--text": theme.palette.text.primary,
        "--muted-text": theme.palette.text.secondary,
        "--border": theme.palette.divider,
      }}
    >
      {sections.map((section, i) => (
        <motion.div
          className="about-section"
          key={i}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {i % 2 === 0 ? (
            <>
              <motion.img
                src={section.img}
                alt={section.title}
                variants={imgVariants}
              />

              <motion.div
                className="about-text"
                variants={textVariants}
              >
                <h1>{section.title}</h1>
                <p>{section.text}</p>
              </motion.div>
            </>
          ) : (
            <>
              <motion.div
                className="about-text"
                variants={textVariants}
              >
                <h1>{section.title}</h1>
                <p>{section.text}</p>
              </motion.div>

              <motion.img
                src={section.img}
                alt={section.title}
                variants={imgVariants}
              />
            </>
          )}
        </motion.div>
      ))}
    </div>
  );
}
