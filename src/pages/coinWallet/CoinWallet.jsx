import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Img from "../../components/Img";
import { bg_header_image } from "../../assets/images";
import { useSelector } from "react-redux";
import { convertTimestamp } from "../../utils/convert";
import { formatMoney, isLoadMore } from "../../utils/appUtils";
import { useTranslation } from "react-i18next";
import { getCoinHistory } from "../../services/api/coinApis";
import { teaOutlineIcon, walletTeaIcon } from "../../assets/icons";

function CoinWallet() {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const [coinHistory, setCoinHistory] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const coinValue = useSelector((state) => state.coinBalance.value);
  const [status, setStatus] = useState({
    name: t("history"),
    value: undefined,
  });

  const dataStatus = [
    {
      name: t("history"),
      value: undefined,
    },
    {
      name: t("received"),
      value: "reward_joining",
    },
    {
      name: t("used"),
      value: "payment_order",
    },
  ];

  const getCoinTransaction = () => {
    getCoinHistory({
      page: page,
      onSuccess: (resp) => {
        if (resp.data.data.length > 0) {
          setIsLoading(true);
        } else {
          setIsLoading(false);
        }

        if (page === 1) {
          setCoinHistory(resp.data.data);
        } else {
          setCoinHistory((prev) => [...prev, ...resp.data.data]);
        }
      },
      onError: (err) => {
        console.log(err);
      },
    });
  };

  useEffect(() => {
    getCoinTransaction();
  }, [page]);

  // scroll to load more
  useEffect(() => {
    function handleScrollEvent() {
      console.log(
        window.innerHeight + document.documentElement.scrollTop + 0.30428374923,
        document.scrollingElement.scrollHeight
      );
      if (isLoadMore()) {
        // setPage((prev) => prev + 1);
        console.log(true);
      }
    }
    window.addEventListener("scroll", handleScrollEvent);
    return () => {
      window.removeEventListener("scroll", handleScrollEvent);
    };
  }, []);

  console.log(page);
  return (
    <div>
      <Header title={"Vi FT Coin"} transparent backWhite />
      <Img
        src={bg_header_image}
        className={"w-full fixed top-0 z-10 h-60"}
        cover
      />
      <div className="fixed w-full z-50">
        <div className=" font-semibold text-center text-white my-12">
          <p className="text-3xl mb-2">{formatMoney(coinValue.balance)} FT</p>
          <p className="text-xs">
            {formatMoney(coinValue.balance)} se het han vao ngay{" "}
            {convertTimestamp(coinValue.expire)}
          </p>
        </div>

        <div className=" grid grid-flow-row grid-cols-3 w-full text-center bg-white py-3 font-bold text-textSubdued border-b-[1px] border-textSubdued">
          {dataStatus.map((item, index) => (
            <span
              key={index}
              className={`${status.value === item.value && "text-black"}`}
              onClick={() => setStatus(item)}
            >
              {item.name.toUpperCase()}
            </span>
          ))}
        </div>
      </div>
      <div className="p-4 mt-[45%] bg-white pb-12">
        {coinHistory?.map((item, index) => (
          <div
            key={index}
            className="flex flex-row items-center justify-between font-medium my-6"
          >
            <div className="flex flex-row items-center">
              <Img src={walletTeaIcon} />
              <div>
                <p>{item.tran_type}</p>
                <p>{convertTimestamp(item.transaction_time)}</p>
              </div>
            </div>
            <div>
              <p>{formatMoney(item.coin_value)} FT</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CoinWallet;
