import React, { useEffect } from "react";
import Img from "../../components/Img";
import Carousel from "./Carousel";
import Event from "./Event";
import { useLocation, useNavigate } from "react-router-dom";
import { PAGE_NAMES } from "../../constants/pagesName";
import { useSelector } from "react-redux";
import {
  arrowRightIcon,
  bellIcon,
  emptyWalletAddIcon,
  feelingteaWalletIcon,
  femaleIcon,
  maleIcon,
  myGiftIcon,
  qrIcon,
  roundTeaLeavesIcon,
  starIcon,
  teaOutlineIcon,
  ticketIcon,
} from "../../assets/icons";
import { formatMoney, startUpApp } from "../../utils/appUtils";
import News from "./News";

function Home() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.value);
  const rankInfo = useSelector((state) => state.user.rankInfo);
  const walletBalance = useSelector((state) => state.walletBalance.value);
  const coinBalance = useSelector((state) => state.coinBalance.value);
  const articles = useSelector((state) => state.article.value);

  const { state } = useLocation();

  useEffect(() => {
    // get infomation user when login success
    if (state?.isValidated) {
      startUpApp();
    }
  }, [state?.isValidated]);

  return (
    <div>
      <div className="w-[100vw] h-48 bg-mainColor">
        <Img
          src={teaOutlineIcon}
          className={"absolute top-0 right-10"}
          width={200}
          height={200}
        />
      </div>

      <div className="-mt-40 mb-14 px-4 flex flex-row justify-between items-center">
        <div
          className="flex flex-row w-2/3 items-center"
          onClick={() => navigate(PAGE_NAMES.ACCOUNT)}
        >
          <Img
            src={user?.contact_gender === "1" ? maleIcon : femaleIcon}
            width={40}
            height={40}
            className={"bg-white h-min rounded-full"}
          />
          <div className="flex flex-col ml-4">
            <span className="text-white font-medium">
              Hello {user.contact_name || "Hello!"}
            </span>
            <span className=" text-yellow text-sm">
              {rankInfo.name || "You have not registered an account yet"}
            </span>
          </div>
        </div>

        <div className="flex flex-row">
          <Img src={qrIcon} className={"mr-2"} />
          <Img src={bellIcon} />
        </div>
      </div>

      <div className=" bg-bgColor w-screen min-h-screen relative rounded-t-3xl pt-16 pb-36">
        <div className="absolute -top-6 flex flex-row justify-between left-0 w-full px-4">
          <div
            className="flex-row flex bg-white pl-2 py-2 rounded-lg items-center w-full mr-2 shadow-md"
            onClick={() => navigate(PAGE_NAMES.WALLET)}
          >
            <Img src={feelingteaWalletIcon} />
            <div className="flex flex-col grow mx-2 ml-3">
              <span className="text-sm font-semibold">FT Wallet</span>
              <span className="text-mainColor font-semibold text-sm mt-1">
                {formatMoney(walletBalance.value) || "0"} đ
              </span>
            </div>
            <Img src={arrowRightIcon} />
          </div>

          <div
            className="flex-row flex bg-white pl-2 py-2 rounded-lg items-center w-full ml-2 shadow-md"
            onClick={() => navigate(PAGE_NAMES.COIN_WALLET)}
          >
            <Img src={roundTeaLeavesIcon} />
            <div className="flex flex-col grow mx-2 ml-3">
              <span className="text-sm font-semibold">FT Coin</span>
              <span className="text-mainColor font-semibold text-sm mt-1">
                {formatMoney(coinBalance.balance) || "0"} FT
              </span>
            </div>
            <Img src={arrowRightIcon} />
          </div>
        </div>

        {/* ===================================================== */}

        <div className="flex flex-row justify-between px-4">
          <div className="flex flex-col items-center w-1/5">
            <Img src={starIcon} width={40} />
            <span className="text-center w-fit text-sm mt-4">
              Sản phẩm yêu thích
            </span>
          </div>
          <div className="flex flex-col items-center w-1/5">
            <Img src={emptyWalletAddIcon} width={40} />
            <span className="text-center w-fit text-sm mt-4">
              Nạp tiền vào ví
            </span>
          </div>
          <div className="flex flex-col items-center w-1/5">
            <Img src={ticketIcon} width={40} />
            <span className="text-center w-fit text-sm mt-4">
              Tin tức của tôi
            </span>
          </div>
          <div className="flex flex-col items-center w-1/5">
            <Img src={myGiftIcon} width={40} />
            <span className="text-center w-fit text-sm mt-4">
              Đơn hàng của tôi
            </span>
          </div>
        </div>

        <div className="px-4">
          <Carousel data={articles} />
        </div>

        <Event data={articles} />

        <News data={articles} />
      </div>
    </div>
  );
}

export default Home;
