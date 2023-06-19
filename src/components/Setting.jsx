import Swiper from "swiper";
import { EffectCoverflow, Pagination } from "swiper";

Swiper.use([EffectCoverflow, Pagination]);

export const SwiperSettings = {
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: "auto",
  coverflowEffect: {
    rotate: 40,
    stretch: 0,
    depth: 100,
    modifier: 1,
    slideShadows: true,
  },
  initialSlide: 2,
  pagination: true,
  modules: [EffectCoverflow, Pagination],
  className: "swiper",
};
