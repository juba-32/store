import { motion } from "framer-motion";
import "./Bannar.css";
import Button from "../../reusable component/button/Button";
import { useTranslation } from "react-i18next";

export default function Bannar() {
  const { t } = useTranslation();
  const bannerData = [
    {
      src: "https://images.pexels.com/photos/1444416/pexels-photo-1444416.jpeg",
      caption: t("hero.Home Cinema"),
      link: "/tv",
    },
    {
      src: "https://images.pexels.com/photos/12920900/pexels-photo-12920900.jpeg",
      caption: t("hero.Premium Headphones"),
      link: "/audio",
    },
    {
      src: "https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg",
      caption: t("hero.Next-Gen iPhone"),
      link: "/mobile",
    },
    {
      src: "https://images.pexels.com/photos/3945683/pexels-photo-3945683.jpeg",
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
          initial={{
            opacity: 0,
            y: 150, // slide in from bottom
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 1.2,
            ease: "easeOut",
            delay: i * 0.4, // one by one
          }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <img src={item.src} alt={item.caption} />
          <motion.div
            className="banner-content"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: i * 0.4 + 0.2, // sync with image
              duration: 1,
              ease: "easeOut",
            }}
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
