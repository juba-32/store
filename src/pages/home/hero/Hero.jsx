import { useState, useEffect } from "react";
import "./Hero.css";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useMediaQuery, useTheme } from "@mui/material";

export default function Hero() {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const texts = [t("hero.Welcome to AM"), t("hero.history of glory")];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev === 0 ? 1 : 0));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
    exit: { opacity: 0 },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
  };

  return (
    <section className={`hero-section ${isMobile ? "mobile" : ""}`}>
      <div className="hero-overlay" />

      <div className="hero-content">
        <AnimatePresence mode="wait">
          <motion.h1
            key={texts[index]}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="animated-text"
          >
            {texts[index].split("").map((letter, i) => (
              <motion.span key={i} variants={letterVariants}>
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            ))}
          </motion.h1>
        </AnimatePresence>

        <Link to="/products" className="hero-btn">
          {t("hero.explore")}
        </Link>
      </div>
    </section>
  );
}