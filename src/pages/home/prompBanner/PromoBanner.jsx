import { motion } from "framer-motion";
import "./PromoBanner.css";

export default function PromoBanner() {
  return (
    <motion.section
      className="promo-banner"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="promo-glass">
        <h2>🔥 Flash Sale</h2>
        <p>Up to <span>40% OFF</span> on selected electronics</p>
        <button>Shop Deals</button>
      </div>
    </motion.section>
  );
}