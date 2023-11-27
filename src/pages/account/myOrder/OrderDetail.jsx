import React from "react";
import Header from "../../../components/Header";
import { useLocation, useNavigate } from "react-router-dom";
import Img from "../../../components/Img";
import { formatMoney } from "../../../utils/appUtils";
import { roundTeaLeavesIcon } from "../../../assets/icons";
import Button from "../../../components/Button";
import { convertTimestamp } from "../../../utils/convert";
import { PAGE_NAMES } from "../../../constants/pagesName";

function OrderDetail() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state?.item) return;

  // Get order item
  const items = state.item?.items.filter((item) => item.parent_id === "");

  // get toping item
  items.forEach((parent) => {
    parent.children = state.item.items.filter(
      (child) =>
        child.parent_id === parent.id &&
        child.time_choose === parent.time_choose
    );
  });

  return (
    <div className="mb-52">
      <Header title={"Order detail"} />

      <div>
        {items?.map((item, index) => (
          <div key={index} className="bg-white p-6 mt-4 ">
            <div className="flex flex-row items-center border-b-[1px] border-borderColor pb-6">
              <Img
                src={item.thumbnail}
                className={"w-16 h-full mr-4 rounded-lg"}
              />
              <div className="w-full">
                <p className=" font-semibold">{item.item_name}</p>
                <p className="text-sm text-textSubdued font-medium">
                  {item?.children.map((item) => item?.item_name).join(", ")}
                </p>
                <div className="flex flex-row justify-between">
                  <div className="flex flex-row items-center">
                    <span className="text-mainColor text-sm font-semibold">
                      {formatMoney(state.item.net_amount)}đ
                    </span>
                    <span className="text-sm font-semibold ml-4 mr-2">
                      {state.item.net_amount / 1000}
                    </span>
                    <Img
                      src={roundTeaLeavesIcon}
                      width={14}
                      height={14}
                      className={"mt-1"}
                    />
                  </div>
                  <span className=" font-semibold text-textSubdued">
                    x{item.quantity}
                  </span>
                </div>
              </div>
            </div>
            <div className="pt-6">
              <div className="flex flex-row justify-between">
                <span className=" font-medium">Total</span>
                <span className="font-semibold text-lg text-mainColor">
                  {formatMoney(state.item.net_amount)}đ
                </span>
              </div>
              <p className="font-medium mt-2 mb-2">Payment method</p>
              {state.item.payment_methods?.map((method) => (
                <span
                  key={method.method_id}
                  className="text-mainColor font-medium px-3 py-1 mr-2"
                >
                  {method.name}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="fixed bottom-0 pt-4 px-6 w-full bg-white">
        <div className="flex flex-row justify-between">
          <span className="font-medium text-textSubdued">Order no</span>
          <span className=" text-blue font-semibold">
            {state.item.order_no}
          </span>
        </div>
        <div className="flex flex-row justify-between mt-2">
          <span className="font-medium text-textSubdued">Time order</span>
          <span className=" font-semibold">
            {convertTimestamp(state.item.order_time)}
          </span>
        </div>
        <Button onClick={() => navigate(PAGE_NAMES.HOME)}>HOME</Button>
      </div>
    </div>
  );
}

export default OrderDetail;
