import React, { useState, useEffect } from "react";
import "./Hero.css";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function Hero() {
    const { t } = useTranslation();

  const texts = ["A.Bendary", t("hero.A history of glory")];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev === 0 ? 1 : 0)); // Toggle text
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, []);

  // Parent animation (stagger effect)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }, // Delay between letters
    },
  };

  // Letter animation
  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
  };

  return (
    <div className="hero-section">
      <video
        autoPlay
        loop
        muted
        src="https://videos.pexels.com/video-files/9068522/9068522-sd_640_360_25fps.mp4"
        type="video/mp4"
      ></video>

      <div className="hero-content">
        <AnimatePresence mode="wait">
          <motion.h1
            key={texts[index]}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="animated-text"
          >
            {texts[index].split("").map((letter, i) => (
              <motion.span key={i} variants={letterVariants}>
                {letter}
              </motion.span>
            ))}
          </motion.h1>
        </AnimatePresence>

        <Link to={"/product"}>{t("hero.explore")}</Link>
      </div>
    </div>
  );
}
