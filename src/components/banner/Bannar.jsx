import { motion } from "framer-motion";
import "./Bannar.css";
import Button from "../../reusable component/button/Button";
import { useTranslation } from "react-i18next";

import tv from "../../assets/slide-tv-1024.webp";
import audio from "../../assets/slide-audio-1024.webp";
import gaming from "../../assets/slide-games-1024.webp";
import mobile from "../../assets/mobile.webp";

export default function Bannar() {
  const { t } = useTranslation();

  const bannerData = [
    {
      src: tv,
      caption: t("hero.Home Cinema"),
      link: "/product?categoryFilter=audio",
    },
    {
      src: audio,
      caption: t("hero.Premium Headphones"),
      link: "/audio",
    },
    {
      src: mobile,
      caption: t("hero.Next-Gen iPhone"),
      link: "/mobile",
    },
    {
      src: gaming,
      caption: t("hero.Crystal Clear Audio"),
      link: "/gaming",
    },
  ];

  return (
    <div className="banner">
      {bannerData.map((item, i) => (
        <motion.div
          key={i}
          className="banner-img"
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut", delay: i * 0.3 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <img
            src={item.src}
            srcSet={`
              ${item.src} 480w,
              ${item.src} 768w,
              ${item.src} 1024w,
              ${item.src} 1440w
            `}
            sizes="(max-width: 480px) 480px,
                   (max-width: 768px) 768px,
                   (max-width: 1024px) 1024px,
                   100vw"
            alt={item.caption}
            loading="lazy"
            decoding="async"
            fetchpriority="low"
            width="1600"
            height="900"
          />

          <motion.div
            className="banner-content"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 + 0.1, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h1>{item.caption}</h1>
            <Button link={item.link} />
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}
