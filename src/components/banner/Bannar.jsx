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
          initial={{ opacity: 0, y: 150 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: i * 0.4 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <img
            src={`${item.src}?auto=compress&cs=tinysrgb&h=450`}
            srcSet={`
              ${item.src}?auto=compress&cs=tinysrgb&h=250 480w,
              ${item.src}?auto=compress&cs=tinysrgb&h=350 768w,
              ${item.src}?auto=compress&cs=tinysrgb&h=450 1024w,
              ${item.src}?auto=compress&cs=tinysrgb&h=600 1440w
            `}
            sizes="(max-width: 480px) 250px,
                   (max-width: 768px) 350px,
                   (max-width: 1024px) 450px,
                   600px"
            alt={item.caption}
            loading="lazy"
          />
          <motion.div
            className="banner-content"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.4 + 0.2, duration: 1, ease: "easeOut" }}
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
