import "./AboutPage.css";
import { motion } from "framer-motion";
export default function AboutPage() {
  const sections = [
    {
      title: "About Us",
      text: `At Nelly, it’s all about making life easier, smarter, and more
      enjoyable. We created Nelly as a place where you can slow down,
      explore, and discover what matters most to you. Whether you're
      browsing products, finding inspiration, or simply enjoying a smooth
      shopping experience, Nelly is here to make your day better. Your time
      is valuable — and Nelly helps you make the most of it.`,
      img: "/images/about.avif",
    },
    {
      title: "Our Values",
      text: `At Nelly, we believe in quality without compromise. Our foundation
      may be local, but our perspective is global. We focus not on
      tradition, but on what matters today — simplicity, purpose, and
      thoughtful design. Every product we offer is selected with care,
      built to be functional, and meant to bring joy to your everyday
      life. We value the essentials: meaningful experiences, reliable
      quality, and a seamless way to discover what you love. Nelly
      represents diversity, modern living, and a curated range of premium
      products. Sustainability isn’t a trend for us — it’s a commitment to
      you, and to the world we share.`,
      img: "/images/culture.avif",
    },
  ];

  const imgVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const textVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut", delay: 0.2 },
    },
  };

  return (
    <div>
      {sections.map((section, i) => (
        <motion.div
          className="aboutUs"
          key={i}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {i % 2 === 0 ? (
            <>
              <motion.img src={section.img} alt={section.title} variants={imgVariants} />
              <motion.div className="aboutUs-text" variants={textVariants}>
                <h1>{section.title}</h1>
                <p>{section.text}</p>
              </motion.div>
            </>
          ) : (
            <>
              <motion.div className="aboutUs-text" variants={textVariants}>
                <h1>{section.title}</h1>
                <p>{section.text}</p>
              </motion.div>
              <motion.img src={section.img} alt={section.title} variants={imgVariants} />
            </>
          )}
        </motion.div>
      ))}
    </div>
  );
}
