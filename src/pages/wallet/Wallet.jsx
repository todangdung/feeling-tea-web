import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Img from "../../components/Img";
import { bg_header_image } from "../../assets/images";
import { useDispatch, useSelector } from "react-redux";
import { formatMoneyVN } from "../../utils/appUtils";
import {
  arrowRightIcon,
  bagClock,
  paymentsCheckmark,
  qrRoundIcon,
  rechargeIcon,
  walletIcon,
} from "../../assets/icons";
import { useNavigate } from "react-router-dom";
import { PAGE_NAMES } from "../../constants/pagesName";
import { getTransactionHistory } from "../../services/api/walletApis";
import { getPrevious } from "../../utils/timeUtils";
import { useTranslation } from "react-i18next";
import { notiPopupStorage } from "../../redux/slice/notiPopupSlice";

import TransactionItem from "../../components/wallet/TransactionItem";

function Wallet() {
  const navigate = useNavigate();
  const walletData = useSelector((state) => state.walletBalance.value);
  const { t } = useTranslation();
  const [tranHistory, setTranHistory] = useState([]);
  const dispatch = useDispatch();
  const menus = [
    {
      icon: rechargeIcon,
      title: "Top up",
      onClick: () => {
        navigate(PAGE_NAMES.TOP_UP);
      },
    },
    {
      icon: qrRoundIcon,
      title: "Scan QR",
      onClick: () => {
        dispatch(
          notiPopupStorage({
            message: "Chuc nang nay dang trong qua trinh phat trien",
          })
        );
      },
    },
    {
      icon: paymentsCheckmark,
      title: "Payment code",
      onClick: () => {
        navigate(PAGE_NAMES.PAYMENT_CODE);
      },
    },
    {
      icon: walletIcon,
      title: "Width draw",
      onClick: () => {
        dispatch(
          notiPopupStorage({
            message: "Chuc nang nay dang trong qua trinh phat trien",
          })
        );
      },
    },
    {
      icon: bagClock,
      title: "Transaction history",
      onClick: () => {
        navigate(PAGE_NAMES.TRANSACTION_HISTORY);
      },
    },
  ];

  const getTransactions = () => {
    const today = new Date();
    const daysAgo = getPrevious(7);
    const startTimestamp = daysAgo.getTime() / 1000;
    const endTimestamp = today.getTime() / 1000;
    const body = {
      start_date: startTimestamp,
      end_date: endTimestamp,
    };
    getTransactionHistory({
      body: body,
      onSuccess: (resp) => {
        if (resp.data?.objects?.length > 0) {
          setTranHistory(resp.data?.objects.slice(0, 5));
        }
      },
      onError: (err) => {
        console.log(err);
      },
    });
  };

  useEffect(() => {
    getTransactions();
  }, []);

  return (
    <div>
      <Header transparent backWhite title={"Vi Feeling tea"} />
      <Img
        src={bg_header_image}
        width={"100%"}
        className={"-z-10 absolute h-80 top-0"}
        cover
      />
      <div className="items-center flex flex-col py-6 ">
        <p className=" font-semibold text-white text-3xl mb-2">
          {formatMoneyVN(walletData.value)}
        </p>
        <p className=" font-semibold text-white text-2xl mb-2">
          {walletData.wallet_id}
        </p>
      </div>
      <div className="px-4">
        <div className="bg-white w-full py-6 pb-4 rounded-xl shadow-lg">
          <div className=" flex flex-row justify-between flex-wrap gap-y-8">
            {menus.map((item, index) => (
              <div className="flex flex-col items-center w-1/3" key={index}>
                <Img
                  src={item.icon}
                  className={"w-12 mb-2"}
                  onClick={item.onClick}
                />
                <span className=" font-medium text-xs text-center">
                  {item.title}
                </span>
              </div>
            ))}
          </div>

          <div className="p-4 pb-0">
            <div className="flex flex-row items-center justify-between mb-4 mt-4">
              <p className=" font-semibold">Recent transactions</p>
              <Img src={arrowRightIcon} />
            </div>
            {tranHistory.map((item, index) => (
              <TransactionItem item={item} key={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Wallet;
