import React, { useState, useEffect } from "react";
import "./Hero.css";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function Hero() {
  const { t } = useTranslation();

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
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.5 } },
  };

  return (
    <div
      className="hero-section"
      style={{
        backgroundImage:
          `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.1)), url(${"/images/storeBG.webp"})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
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
