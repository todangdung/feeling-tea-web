import React, { useEffect, useState } from "react";
import Header from "../../../components/Header";
import { STATUS_ORDER } from "../../../constants/constants";
import { listOrder } from "../../../services/api/userApis";
import Img from "../../../components/Img";
import { logoIcon } from "../../../assets/icons";
import { convertTimestamp } from "../../../utils/convert";
import { isLoadMore } from "../../../utils/appUtils";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import { PAGE_NAMES } from "../../../constants/pagesName";

const dataStatus = [
  {
    label: "Tất cả",
    value: undefined,
  },
  {
    label: "Chấp nhận đơn",
    value: STATUS_ORDER.CONFIRM,
  },
  {
    label: "Xác nhận",
    value: STATUS_ORDER.ACCEPT,
  },
  {
    label: "Đang giao",
    value: STATUS_ORDER.DELIVERY,
  },
  {
    label: "Thành công",
    value: STATUS_ORDER.COMPLETED,
  },
  {
    label: "Đã huỷ",
    value: STATUS_ORDER.CANCEL,
  },
];

function MyOrder() {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    // if orders reponse === 0, stop call api
    if (!isLoading) {
      return;
    }

    // call api
    listOrder({
      page,
      onSuccess: (resp) => {
        if (resp.data.data.length > 0) {
          setIsLoading(true);
        } else {
          setIsLoading(false);
        }

        if (page === 1) {
          setOrders(resp.data.data);
        } else {
          setOrders((prev) => [...prev, ...resp.data.data]);
        }
      },
      onError: (err) => {
        console.log(err);
      },
    });
  }, [page]);

  // scroll to load more
  useEffect(() => {
    function handleScrollEvent() {
      if (isLoadMore()) {
        setPage((prev) => prev + 1);
      }
    }
    window.addEventListener("scroll", handleScrollEvent);
    return () => {
      window.removeEventListener("scroll", handleScrollEvent);
    };
  }, []);

  const status = (status) => {
    switch (status) {
      case STATUS_ORDER.CONFIRM:
        return "confirm";
      case STATUS_ORDER.DELIVERY:
        return "deli";
      case STATUS_ORDER.COMPLETED:
        return "success";
      case STATUS_ORDER.ACCEPT:
        return "accept";
      default:
        return "cancel";
    }
  };

  const colorStatus = (status) => {
    switch (status) {
      case STATUS_ORDER.COMPLETED:
        return "text-green";
      case STATUS_ORDER.CANCEL:
        return "text-red";
      default:
        return "text-textSubdued";
    }
  };
  const [selectedOption, setSelectedOption] = useState({
    label: "Tất cả",
    value: undefined,
  });

  // filter item for status
  const filterItem = (item) => {
    if (selectedOption.value === undefined) {
      return true;
    }
    if (item.status === selectedOption.value) {
      return true;
    }
    return false;
  };

  // If the length of the status order list is less than 10, continue calling the api
  useEffect(() => {
    if (selectedOption.value === undefined) {
      return;
    }
    const orderStatus = orders.filter(
      (order) => order.status === selectedOption.value
    );
    if (orderStatus.length < 10) {
      setPage((prev) => prev + 1);
    }
  }, [orders, selectedOption]);

  return (
    <div className="mb-20">
      <Header title={"My order"} back />

      <div className=" flex flex-row w-full flex-wrap bg-white justify-center py-2 fixed top-16 px-6">
        <Select
          className="w-full"
          defaultValue={selectedOption}
          onChange={(newStatus) => {
            setSelectedOption(newStatus);
          }}
          options={dataStatus}
        />
      </div>

      <div className="p-4 mt-32">
        {orders?.map((order, index) => (
          <div key={index}>
            {filterItem(order) && (
              <div
                className="rounded-xl p-4 bg-white w-full mb-4 flex flex-row items-center justify-between"
                onClick={() =>
                  navigate(PAGE_NAMES.ORDER_DETAIL + "/" + order.order_no, {
                    state: { item: order },
                  })
                }
              >
                <div className="flex flex-row items-center">
                  <Img src={logoIcon} className={"w-16 mr-3"} />
                  <div>
                    <p className="font-medium text-sm mb-1">
                      Đơn hàng {order.order_no}
                    </p>

                    <p className="text-textSubdued text-xs font-medium">
                      {convertTimestamp(order.order_time)}
                    </p>

                    <span className="text-xs font-medium">Total: </span>
                    <span className=" text-textSubdued font-medium text-xs">
                      {order.amount} đ
                    </span>
                  </div>
                </div>
                <span
                  className={colorStatus(order.status) + " block font-medium "}
                >
                  {status(order.status)}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyOrder;
