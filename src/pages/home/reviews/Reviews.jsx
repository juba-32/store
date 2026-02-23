import { motion } from "framer-motion";
import "./Reviews.css";

const reviews = [
  {
    name: "Ahmed M.",
    comment: "Amazing quality and super fast delivery!",
    rating: 5,
  },
  {
    name: "Sara K.",
    comment: "Best prices compared to other stores.",
    rating: 4,
  },
  {
    name: "Omar T.",
    comment: "Customer support was very helpful.",
    rating: 5,
  },
];

export default function Reviews() {
  return (
    <section className="reviews">
      <h2>What Our Customers Say</h2>

      <div className="reviews-grid">
        {reviews.map((review, i) => (
          <motion.div
            key={i}
            className="review-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
            viewport={{ once: true }}
          >
            <p className="comment">"{review.comment}"</p>

            <div className="review-footer">
              <span className="name">{review.name}</span>
              <span className="stars">
                {"★".repeat(review.rating)}
                {"☆".repeat(5 - review.rating)}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}