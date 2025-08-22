import React from "react";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Parallax, Autoplay, Navigation } from "swiper/modules";
import "swiper/css/navigation";

export default function CategorySlider() {
  return (
    <div>
      <Swiper
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
              "url(https://storage.googleapis.com/fir-auth-1c3bc.appspot.com/1694158321609-71pM0BQZLOL._SL1500_.jpg)",
            backgroundSize: "100% 100%",
            backgroundPosition: "center",
          }}
        ></SwiperSlide>
        <SwiperSlide
          style={{
            backgroundImage:
              "url(https://storage.googleapis.com/fir-auth-1c3bc.appspot.com/1692458709910-51DkZC39goL._SL1000_.jpg)",
            backgroundSize: "100% 100%",
            backgroundPosition: "center",
            backgroundRepeat:"no-repeat"
          }}
        ></SwiperSlide>
        <SwiperSlide
          style={{
            backgroundImage:
              "url(https://storage.googleapis.com/fir-auth-1c3bc.appspot.com/1691074519203-galaxy%20S22%205G.jpg)",
            backgroundSize: "100% 100%",
            backgroundPosition: "center",
          }}
        ></SwiperSlide>
        <SwiperSlide
          style={{
            backgroundImage:
              "url(https://storage.googleapis.com/fir-auth-1c3bc.appspot.com/1694286670895-516qT+ItO5L._SL1500_.jpg)",
            backgroundSize: "100% 100%",
            backgroundPosition: "center",
          }}
        ></SwiperSlide>
        
      </Swiper>
    </div>
  );
}
