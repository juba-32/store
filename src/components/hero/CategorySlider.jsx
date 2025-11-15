import React from "react";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Parallax, Autoplay, Navigation } from "swiper/modules";
import "swiper/css/navigation";
import gaming from "../../assets/gaming.jpg"
import audio from "../../assets/audio.jpeg"
import tv from "../../assets/tv.jpeg"
import mobile from "../../assets/mobile.jpeg"
const slides = [
  {
    url: tv,
    title: "Home Cinema",
    description: "Best audio and visual experience",
  },
  {
    url: audio,
    title: "Premium Headphones",
    description: "Crystal clear sound quality",
  },
  {
    url: mobile,
    title: "Next-Gen Mobile",
    description: "Powerful and sleek design",
  },
  {
    url: gaming,
    title: "Gaming Gear",
    description: "Level up your game",
  },
];

const getOptimizedUrl = (url, width = 1024) =>
  `${url}?auto=compress&cs=tinysrgb&fm=webp&w=${width}`;

export default function CategorySlider() {
  return (
    <Swiper
      dir="ltr"
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{ delay: 3500, disableOnInteraction: false }}
      speed={600}
      parallax={true}
      navigation={true}
      modules={[Parallax, Autoplay, Navigation]}
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
              objectFit: "cover", // keeps the full image visible without zoom
            }}
          />

          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              color: "white",
              textAlign: "center",
              textShadow: "0 0 10px rgba(0,0,0,0.7)",
              zIndex: 2,
              padding: "0 1rem",
            }}
          >
            <h2 style={{ margin: 0, fontSize: "2rem" }}>{slide.title}</h2>
            <p style={{ margin: "0.5rem 0 0 0", fontSize: "1rem" }}>
              {slide.description}
            </p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
