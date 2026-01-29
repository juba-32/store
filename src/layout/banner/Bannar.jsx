import { motion } from "framer-motion";
import "./Bannar.css";
import Button from "../../components/button/Button";
import { useTranslation } from "react-i18next";


export default function Bannar() {
  const { t } = useTranslation();

  const bannerData = [
    {
      src: "/images/slide-tv-1024.webp",
      caption: t("hero.Home Cinema"),
      link: "/products?categoryFilter=tv",
    },
    {
      src: "/images/slide-audio-1024.webp",
      caption: t("hero.Premium Headphones"),
      link: "/products?selectCategory=audio",
    },
    {
      src: "/images/slide-mobile.avif",
      caption: t("hero.Next-Gen iPhone"),
      link: "/products?categoryFilter=mobile",
    },
    {
      src: "/images/slide-games-1024.webp",
      caption: t("hero.Crystal Clear Audio"),
      link: "/products?categoryFilter=gaming",
    },
  ];

  return (
    <div className="banner">
      {bannerData.map((item, i) => (
        <motion.div
          key={i}
          className="banner-img"
          initial={{ opacity: 0, y: 150 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: i * 0.4 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <img
            src={item.src}
            alt={item.caption}
            loading="lazy"
            decoding="async"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />

          <motion.div
            className="banner-content"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 + 0.2, duration: 1, ease: "easeOut" }}
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
