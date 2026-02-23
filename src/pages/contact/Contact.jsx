import "./Contact.css";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function Contact() {
  const { t } = useTranslation();

  return (
    <section className="contact-section">
      <motion.div
        className="contact-card"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <h2 className="contact-title">
          <span>{t("contact.Get in Touch")}</span>
        </h2>

        <p className="contact-subtitle">
          {t("contact.We’d love to hear from you")}
        </p>

        <form className="contact-form">
          <input
            type="text"
            placeholder={t("contact.Your Name")}
            required
          />
          <input
            type="email"
            placeholder={t("contact.Your Email")}
            required
          />
          <textarea
            rows="4"
            placeholder={t("contact.Your Message")}
            required
          />

          <button type="submit" className="contact-btn">
            {t("contact.Send Message")}
          </button>
        </form>
      </motion.div>
    </section>
  );
}