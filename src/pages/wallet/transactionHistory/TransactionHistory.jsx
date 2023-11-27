import React, { useEffect, useState } from "react";
import Header from "../../../components/Header";
import TransactionFilter from "./TransactionFilter";
import { getTransactionHistory } from "../../../services/api/walletApis";
import { useTranslation } from "react-i18next";
import TransactionItem from "../../../components/wallet/TransactionItem";
import { isLoadMore } from "../../../utils/appUtils";

function TransactionHistory() {
  const { t } = useTranslation();

  const [transStatus, setTransStatus] = useState(undefined);
  const [page, setPage] = useState(1);
  const [transHistory, setTransHistory] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isChangeType, setIsChangeType] = useState(false);

  const [transType, setTransType] = useState({
    label: "Tất cả",
    value: undefined,
  });

  const [transDate, setTransDate] = useState({
    label: t("wallet.transactionHistory.today"),
    value: 1,
  });

  // call api function
  const getTransactions = () => {
    setIsChangeType(false);
    const body = {
      page: page,
      start_date: transDate.value === 1 ? null : transDate.startDate,
      end_date: transDate.value === 1 ? null : transDate.endDate,
      transaction_type: transType?.value,
    };

    getTransactionHistory({
      body,
      onSuccess: (resp) => {
        if (resp.data.objects?.length > 0) {
          setIsLoading(true);
        } else {
          setIsLoading(false);
        }

        // neu page === 1 thi set data vao state luon
        if (page === 1) {
          setTransHistory(resp.data.objects);
        } else {
          // neu page khac 1 thi noi tiep data vao mang data truoc do
          setTransHistory((prev) => [...prev, ...resp.data.objects]);
        }
      },

      onError: (err) => {
        console.log(err);
      },
    });
  };

  // goi lai api khi transDate, transType thay doi
  const apiCallback = () => {
    setPage(1);
    setTransHistory(null);
    setIsLoading(true);
    setIsChangeType(true);
  };

  // goi lai api moi khi page thay doi
  useEffect(() => {
    // if orders reponse === 0,hoac khi kho tao thi stop call api
    if (!isLoading) {
      return;
    }

    getTransactions();
  }, [page, isChangeType]);

  // scroll to load more, khi cuon den cuoi trang thi tang page them 1
  // khi thay doi transtype thi ham isLoadMore() se tra ve tru do do dai trang trung nhau
  // khi do page se tang len 2 nen can state isChangeType de kiem soat page
  // Mac dinh isChangeType se la false, neu transType thay doi thi isChangeType se chuyen
  // thanh true va khong cho tang page
  useEffect(() => {
    function handleScrollEvent() {
      if (isLoadMore() && !isChangeType) {
        setPage((prev) => prev + 1);
      }
    }
    window.addEventListener("scroll", handleScrollEvent);
    return () => {
      window.removeEventListener("scroll", handleScrollEvent);
    };
  }, [isChangeType]);

  // loc lich su giao dich bang trang thai
  const filterItem = (item) => {
    if (transStatus === undefined) {
      return true;
    }
    if (item.state === transStatus) {
      return true;
    }
    return false;
  };

  return (
    <div>
      <Header title={"Lich su giao dich"} />
      <TransactionFilter
        statusValue={transStatus}
        dateTimeValue={transDate}
        typeValue={transType}
        dateTimeFilter={(value) => {
          setTransDate(value);
          apiCallback();
        }}
        typeFilter={(value) => {
          setTransType(value);
          apiCallback();
        }}
        statusFilter={(value) => setTransStatus(value)}
      />

      <div className="p-4">
        {transHistory?.map((item, index) => (
          <div key={index}>
            {filterItem(item) && (
              <TransactionItem
                item={item}
                className={
                  "bg-white border-none px-4 my-4 shadow-lg rounded-lg"
                }
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default TransactionHistory;
