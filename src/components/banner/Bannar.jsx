import { motion } from "framer-motion";
import "./Bannar.css";
import Button from "../../reusable component/button/Button";
import { useTranslation } from "react-i18next";
import tv from '../../assets/slide-tv.jpeg'
import audio from '../../assets/slide-audio.jpeg'
import gaming from '../../assets/slide-games.jpeg'
import mobile from '../../assets/slide-mobile.jpeg'
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
          initial={{ opacity: 0, y: 150 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: i * 0.4 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <img
            src={`${item.src}?auto=compress&cs=tinysrgb&fm=webp&w=1440`}
            srcSet={`
    ${item.src}?auto=compress&cs=tinysrgb&fm=webp&w=480 480w,
    ${item.src}?auto=compress&cs=tinysrgb&fm=webp&w=768 768w,
    ${item.src}?auto=compress&cs=tinysrgb&fm=webp&w=1024 1024w,
    ${item.src}?auto=compress&cs=tinysrgb&fm=webp&w=1440 1440w,
    ${item.src}?auto=compress&cs=tinysrgb&fm=webp&w=1920 1920w
  `}
            sizes="(max-width: 480px) 480px,
         (max-width: 768px) 768px,
         (max-width: 1024px) 1024px,
         100vw"
            alt={item.caption}
            loading="lazy"
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
