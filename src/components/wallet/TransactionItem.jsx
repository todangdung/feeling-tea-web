import React from "react";
import Img from "../Img";
import { walletTeaIcon } from "../../assets/icons";
import {
  checkStatus,
  checkTransactionType,
  checkTransactionValue,
} from "../../utils/wallet";
import { useTranslation } from "react-i18next";
import { convertTimestamp } from "../../utils/convert";
import { formatMoneyVN } from "../../utils/appUtils";

function TransactionItem({ item, className }) {
  const { t } = useTranslation();
  return (
    <div
      className={`flex flex-row justify-between items-center py-3 border-b-[1px] border-borderColor ${className}`}
    >
      <div className="flex flex-row items-center">
        <Img src={walletTeaIcon} className={"w-8 mr-2"} />
        <div>
          <p className=" font-semibold text-sm">
            {checkTransactionType(item.doc_type, t)}
          </p>
          <p className=" text-xs mt-1">{convertTimestamp(item.validated_at)}</p>
        </div>
      </div>
      <div className="">
        <p className="font-semibold text-sm text-end">
          {checkTransactionValue(item.transaction_type) +
            " " +
            formatMoneyVN(item.value)}
        </p>
        <p className="text-end text-sm mt-1">{checkStatus(item.state)}</p>
      </div>
    </div>
  );
}

export default TransactionItem;
