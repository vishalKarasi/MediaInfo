import React, { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { EffectCoverflow, Pagination, Keyboard } from "swiper";
import "swiper/swiper-bundle.css";

SwiperCore.use([EffectCoverflow, Pagination, Keyboard]);

function Carousel({ children }) {
  const swiperRef = useRef(null);

  useEffect(() => {
    const swiper = swiperRef.current.swiper;
    const handleKeyDown = (event) => {
      if (event.key === "ArrowRight") {
        swiper.slideNext();
      } else if (event.key === "ArrowLeft") {
        swiper.slidePrev();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const swiperConfig = {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    coverflowEffect: {
      rotate: 20,
      stretch: 0,
      depth: 20,
      modifier: 1,
      slideShadows: true,
    },
    initialSlide: 3,
    pagination: true,
    keyboard: true,
    className: "swiper",
  };

  return (
    <Swiper {...swiperConfig} ref={swiperRef}>
      {React.Children.map(children, (child) => (
        <SwiperSlide>{child}</SwiperSlide>
      ))}
    </Swiper>
  );
}

export default Carousel;
