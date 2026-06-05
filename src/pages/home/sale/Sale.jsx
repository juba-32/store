import { motion } from "framer-motion";
import "./Sale.css";
import { useTranslation } from "react-i18next";
export default function Sale() {
  const { t } = useTranslation();
  return (
    <motion.section
      className="sale-banner"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="sale-glass">
        <h2>{t("sale.title")}</h2>
        <p>{t("sale.description")}</p>
        <button>{t("sale.button")}</button>
      </div>
    </motion.section>
  );
}