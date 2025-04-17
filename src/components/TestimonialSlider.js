import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay, Pagination } from "swiper";

const TestimonialSlider = () => (
  <Swiper
    modules={[Autoplay, Pagination]}
    spaceBetween={30}
    slidesPerView={1}
    autoplay={{ delay: 5000 }}
    pagination={{ clickable: true }}
  >
    <SwiperSlide>
      <Typography>"AirVibe keeps me informed about my environment!" - Jane D.</Typography>
    </SwiperSlide>
    <SwiperSlide>
      <Typography>"The real-time data is a game-changer!" - John S.</Typography>
    </SwiperSlide>
  </Swiper>
);

export default TestimonialSlider;