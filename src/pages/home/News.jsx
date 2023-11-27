import React from "react";
import Img from "../../components/Img";
import { Swiper, SwiperSlide } from "swiper/react";
import { ARTICLE_TYPES } from "../../constants/constants";

function News({ data }) {
  const news = data.filter((newsItem) => newsItem.type === ARTICLE_TYPES.news);

  return (
    <div className="mt-6 pl-4">
      <span className="font-medium">News</span>
      <Swiper spaceBetween={1} slidesPerView={1.5}>
        {news?.map((item, index) => (
          <SwiperSlide className="w-full py-2" key={index}>
            <div className="bg-white rounded-lg overflow-hidden shadow-md overflow-ellipsis w-[90%]">
              <Img src={item.url} width={"100%"} className={"h-32"} cover />
              <p className=" px-3 my-2 line-clamp-2	">{item.title}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default News;
