import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";
import Img from "../../components/Img";
import { ARTICLE_TYPES } from "../../constants/constants";

export default function Carousel({ data }) {
  const banners = data.filter(
    (article) => article.type === ARTICLE_TYPES.banner
  );

  return (
    <Swiper
      style={{ marginTop: 40 }}
      spaceBetween={20}
      cssMode={true}
      navigation={true}
      pagination={true}
      mousewheel={true}
      keyboard={true}
      modules={[Navigation, Pagination, Mousewheel, Keyboard]}
      className="mySwiper"
    >
      {banners?.map((item, index) => (
        <SwiperSlide className=" rounded-xl overflow-hidden" key={index}>
          <Img src={item.url} className={"w-full h-48"} cover />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
