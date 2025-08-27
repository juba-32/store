import React from "react";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Parallax, Autoplay, Navigation } from "swiper/modules";
import "swiper/css/navigation";

export default function CategorySlider() {
  return (
    <div>
      <Swiper
       dir="ltr"
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        style={{
          height: "100vh",
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
        }}
        speed={600}
        parallax={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Parallax, Autoplay, Navigation]}
        className="mySwiper"
      >
        <div
          slot="container-start"
          className="parallax-bg"
          data-swiper-parallax="-23%"
        ></div>
          <SwiperSlide
          style={{
            backgroundImage:
              "url(https://images.pexels.com/photos/1201996/pexels-photo-1201996.jpeg)",
            backgroundSize: "100% 100%",
            backgroundPosition: "center",
          }}
        ></SwiperSlide>
        <SwiperSlide
          style={{
            backgroundImage:
              "url(https://images.pexels.com/photos/887751/pexels-photo-887751.jpeg)",
            backgroundSize: "100% 100%",
            backgroundPosition: "center",
            backgroundRepeat:"no-repeat"
          }}
        ></SwiperSlide>
        <SwiperSlide
          style={{
            backgroundImage:
              "url(https://images.pexels.com/photos/21067/pexels-photo.jpg)",
            backgroundSize: "100% 100%",
            backgroundPosition: "center",
          }}
        ></SwiperSlide>
        <SwiperSlide
          style={{
            backgroundImage:
              "url(https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg)",
            backgroundSize: "100% 100%",
            backgroundPosition: "center",
          }}
        ></SwiperSlide>
        
      </Swiper>
    </div>
  );
}
