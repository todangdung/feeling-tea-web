import React, { useEffect, useState } from "react";
import Select from "react-select";
import { useTranslation } from "react-i18next";
import Modal from "../../../components/Modal";
import Button from "../../../components/Button";
import Img from "../../../components/Img";
import { calendarIcon, closeIcon } from "../../../assets/icons";
import { getPrevious } from "../../../utils/timeUtils";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function TransactionFilter({
  statusValue,
  dateTimeValue,
  typeValue,
  dateTimeFilter,
  typeFilter,
  statusFilter,
}) {
  const { t } = useTranslation();

  const transactionType = [
    {
      label: "Tất cả",
      value: undefined,
    },
    {
      label: t("wallet.transactionHistory.promotion_topup"),
      value: "promotion_topup",
    },
    {
      label: t("wallet.transactionHistory.topup"),
      value: "topup",
    },
    {
      label: t("wallet.transactionHistory.withdraw"),
      value: "withdraw",
    },
    {
      label: t("wallet.transactionHistory.payment"),
      value: "payment",
    },
    {
      label: t("wallet.transactionHistory.refund"),
      value: "refund",
    },
    {
      label: t("wallet.transactionHistory.referrer_point"),
      value: "referrer_point",
    },
    {
      label: t("wallet.transactionHistory.pricing_upgrade_rank"),
      value: "pricing_upgrade_rank",
    },
  ];

  const dates = [
    {
      label: t("wallet.transactionHistory.today"),
      value: 1,
    },
    {
      label: t("wallet.transactionHistory.7days"),
      value: 7,
    },
    {
      label: t("wallet.transactionHistory.30days"),
      value: 30,
    },
    {
      label: t("wallet.transactionHistory.60days"),
      value: 60,
    },
    {
      label: t("Lựa chọn"),
      value: undefined,
    },
  ];

  const transactionStatus = [
    {
      label: "Tất cả",
      value: undefined,
    },
    {
      label: t("wallet.transactionHistory.transaction_success"),
      value: "validated",
    },
    {
      label: t("wallet.transactionHistory.pending"),
      value: "pending",
    },
    {
      label: t("wallet.transactionHistory.cancel"),
      value: "cancelled",
    },
  ];
  const [active, setActive] = useState(false);
  const [today] = useState(new Date());
  const [startDate, setStartDate] = useState({
    active: false,
    value: null,
  });

  const [endDate, setEndDate] = useState({
    active: false,
    value: null,
  });

  // lay gia tri start date va end date
  const handleSelectDate = (selectedDate) => {
    if (selectedDate.value !== undefined) {
      const daysAgo = getPrevious(selectedDate.value);

      dateTimeFilter({
        value: selectedDate.value,
        startDate: daysAgo.getTime() / 1000,
        endDate: today.getTime() / 1000,
      });
    } else {
      setActive(true);
    }
  };

  return (
    <div>
      <div className="p-4 bg-white w-full fixed">
        <div className="flex flex-row items-center gap-2">
          <div className="w-full">
            <p className="text-textSubdued text-sm font-bold">Loai giao dich</p>
            <Select
              className="w-full text-sm font-semibold mt-1"
              defaultValue={typeValue}
              onChange={(newType) => typeFilter(newType)}
              options={transactionType}
            />
          </div>
          <div className="w-full">
            <p className="text-textSubdued text-sm font-bold">
              Thoi gian giao dich
            </p>

            <Select
              className="w-full text-sm font-semibold mt-1"
              defaultValue={dateTimeValue}
              onChange={(newDate) => handleSelectDate(newDate)}
              options={dates}
            />
          </div>
        </div>
        <div className="mt-6 font-semibold text-sm flex flex-row items-center justify-between">
          {transactionStatus.map((item, index) => (
            <div
              onClick={() => statusFilter(item.value)}
              key={index}
              className={`text-xs py-[7px] px-4 w-fit border-[1px] rounded-full ${
                statusValue === item.value
                  ? "border-mainColor text-mainColor"
                  : "border-textSubdued "
              }`}
            >
              {item.label}
            </div>
          ))}
        </div>
      </div>

      <Modal active={active}>
        <div className="flex flex-row items-center justify-between my-2 w-full mb-8">
          <span className="text-lg font-medium">Lua chon thoi gian</span>
          <Img
            src={closeIcon}
            className={"w-4"}
            onClick={() => setActive(false)}
          />
        </div>
        <div className="flex flex-row items-center justify-between w-full border-[1px] text-sm py-2 px-2 border-disableButton rounded-lg font-semibold">
          <span>Thoi gian bat dau</span>
          <div className="flex flex-row items-center">
            <span className="text-textSubdued">
              {startDate.value
                ? startDate.value.toLocaleDateString("en-GB")
                : "DD/MM/YYYY"}
            </span>
            <DatePicker
              className={"datePicker"}
              open={startDate.active}
              selected={startDate.value}
              onChange={(date) => setStartDate({ active: false, value: date })}
              onClickOutside={() =>
                setStartDate({ value: startDate.value, active: false })
              }
            />
            <Img
              src={calendarIcon}
              className="w-5 ml-2"
              onClick={() =>
                setStartDate((prev) => ({ ...prev, active: true }))
              }
            />
          </div>
        </div>
        <div className="flex flex-row items-center justify-between w-full border-[1px] text-sm py-2 px-2 border-disableButton rounded-lg font-semibold mt-4">
          <span>Thoi gian ket thuc</span>
          <div className="flex flex-row items-center">
            <span className="text-textSubdued">
              {endDate.value
                ? endDate.value.toLocaleDateString("en-GB")
                : "DD/MM/YYYY"}
            </span>
            <DatePicker
              className={"datePicker"}
              open={endDate.active}
              selected={endDate.value}
              onChange={(date) => setEndDate({ active: false, value: date })}
              onClickOutside={() =>
                setEndDate({ value: endDate.value, active: false })
              }
            />
            <Img
              src={calendarIcon}
              className="w-5 ml-2"
              onClick={() => setEndDate((prev) => ({ ...prev, active: true }))}
            />
          </div>
        </div>

        <Button
          className={"mt-10"}
          onClick={() => {
            dateTimeFilter({
              startDate: startDate.value / 1000,
              endDate: endDate.value / 1000,
            });
            setActive(false);
          }}
        >
          Xac nhan
        </Button>
      </Modal>

      <div className=" w-full pt-36"></div>
    </div>
  );
}

export default TransactionFilter;
