import { motion } from "framer-motion";
import "./Reviews.css";
import { useTranslation } from "react-i18next";

export default function Reviews() {
  const { t } = useTranslation();
  const reviewsList = t("reviews.list", { returnObjects: true }) || [];
  const metaData = [
    { name: "Ahmed M", rating: 5 },
    { name: "Sara K", rating: 4 },
    { name: "Omar T", rating: 5 },
  ];

  return (
    <section className="reviews">
      <h2>{t("reviews.title")}</h2>

      <div className="reviews-grid">
        {Array.isArray(reviewsList) && reviewsList.map((review, i) => {
          const currentMeta = metaData[i] || { name: "User", rating: 5 };

          return (
            <motion.div
              key={i}
              className="review-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              viewport={{ once: true }}
            >
              <p className="comment">{review.comment}</p>

              <div className="review-footer">
                <span className="name">{currentMeta.name}</span>
                <span className="stars">
                  {"★".repeat(currentMeta.rating)}
                  {"☆".repeat(5 - currentMeta.rating)}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}