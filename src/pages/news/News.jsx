import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Img from "../../components/Img";
import Button from "../../components/Button";
import { useSelector } from "react-redux";
import { ARTICLE_TYPES } from "../../constants/constants";

function News() {
  const [news, setNews] = useState([]);
  const articles = useSelector((state) => state.article.value);

  useEffect(() => {
    const newsData = articles.filter(
      (newsItem) => newsItem.type === ARTICLE_TYPES.news
    );

    setNews(newsData);
  }, [articles]);

  return (
    <div className="mb-20">
      <Header title={"News"} disableBack />

      <div className="p-4">
        {news?.map((newsItem, index) => (
          <div key={index} className="bg-white rounded-lg overflow-hidden mb-6">
            <Img src={newsItem.url} className={"w-full h-52"} cover />
            <div className="py-3 px-4">
              <p className=" font-medium text-lg mb-1">{newsItem.title}</p>
              <p className="text-textSubdued line-clamp-2 my-3">
                {newsItem.content}
              </p>

              <Button className={"w-40 mb-2 mt-2"}>Xem chi tiet</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default News;
