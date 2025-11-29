import React, { useMemo } from "react";
import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Parallax, Autoplay, Navigation } from "swiper/modules";
import gaming from "../../assets/gaming.webp";
import audio from "../../assets/audio.webp";
import tv from "../../assets/tv.webp";
import mobile from "../../assets/mobile.webp";

const slidesData = [
  { url: tv, title: "Home Cinema", description: "Best audio and visual experience" },
  { url: audio, title: "Premium Headphones", description: "Crystal clear sound quality" },
  { url: mobile, title: "Next-Gen Mobile", description: "Powerful and sleek design" },
  { url: gaming, title: "Gaming Gear", description: "Level up your game" },
];

// Helper for responsive optimized images
const getOptimizedUrl = (url, width = 1024) =>
  `${url}?auto=compress&cs=tinysrgb&fm=webp&w=${width}`;

export default function CategorySlider() {
  const slides = useMemo(() => slidesData, []);

  return (
    <Swiper
      dir="ltr"
      modules={[Parallax, Autoplay, Navigation]}
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{ delay: 3500, disableOnInteraction: false }}
      speed={600}
      parallax={true}
      navigation
      className="mySwiper"
      style={{
        width: "100%",
        height: "70vh",
        "--swiper-navigation-color": "#fff",
        "--swiper-pagination-color": "#fff",
      }}
    >
      {slides.map((slide, i) => (
        <SwiperSlide
          key={i}
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden",
          }}
        >
          <img
            src={getOptimizedUrl(slide.url)}
            srcSet={`
              ${getOptimizedUrl(slide.url, 480)} 480w,
              ${getOptimizedUrl(slide.url, 768)} 768w,
              ${getOptimizedUrl(slide.url, 1024)} 1024w,
              ${getOptimizedUrl(slide.url, 1440)} 1440w,
              ${getOptimizedUrl(slide.url, 1920)} 1920w
            `}
            sizes="(max-width: 480px) 480px,
                   (max-width: 768px) 768px,
                   (max-width: 1024px) 1024px,
                   100vw"
            alt={slide.title}
            loading="lazy"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: "transform 0.8s ease",
            }}
          />

          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              color: "#fff",
              textAlign: "center",
              textShadow: "0 0 12px rgba(0,0,0,0.75)",
              zIndex: 2,
              padding: "0 1rem",
            }}
          >
            <h2 style={{ margin: 0, fontSize: "2rem", fontWeight: "700" }}>{slide.title}</h2>
            <p style={{ margin: "0.5rem 0 0 0", fontSize: "1rem" }}>{slide.description}</p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
