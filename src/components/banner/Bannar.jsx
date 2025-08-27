import { motion } from "framer-motion";
import "./Bannar.css";
import Button from "../../reusable component/button/Button";
import { useTranslation } from "react-i18next";

export default function Bannar() {
  const { t } = useTranslation();
  const bannerData = [
    {
      src: "https://storage.googleapis.com/fir-auth-1c3bc.appspot.com/1694154827301-81+JXgPUDLL._SL1500_.jpg",
      caption: t("hero.Home Cinema"),
      link: "/tv",
    },
    {
      src: "https://storage.googleapis.com/fir-auth-1c3bc.appspot.com/1691056348236-headphone3.jpg",
      caption: t("hero.Premium Headphones"),
      link: "/audio",
    },
    {
      src: "https://storage.googleapis.com/fir-auth-1c3bc.appspot.com/1691076020478-iPhone%2014%20pro.jpg",
      caption: t("hero.Next-Gen iPhone"),
      link: "/mobile",
    },
    {
      src: "https://storage.googleapis.com/fir-auth-1c3bc.appspot.com/1694241552001-61-jjE67uqL._SL1500_.jpg",
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
