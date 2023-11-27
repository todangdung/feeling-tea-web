import { useEffect, useState } from "react";
import Header from "../../components/Header";
import OrderProduct from "./OrderProduct";
import Button from "../../components/Button";
import { useSelector } from "react-redux";
import { formatMoneyVN } from "../../utils/appUtils";
import Img from "../../components/Img";
import { roundTeaLeavesIcon } from "../../assets/icons";

function ConfirmOrder() {
  const [totalPrice, setTotalPrice] = useState(0);
  const totalPriceStore = useSelector((state) => state.totalPrice.value);

  useEffect(() => {
    // lay tong gia cua tat ca cac san pham dua vao chooseItme
    const totalProductPrice = totalPriceStore.reduce((totalMoney, price) => {
      return totalMoney + price.value;
    }, 0);

    setTotalPrice(totalProductPrice);
  }, [totalPriceStore]);

  return (
    <div className="pb-40">
      <Header title={"Order confirmation"} />
      <OrderProduct />

      <div className="fixed bottom-0 pt-2 border-t-[1px] border-textSubdued px-4 w-full bg-white">
        <div className="flex flex-row justify-between items-center">
          <span className=" font-medium">Total</span>
          <div className="flex flex-col">
            <span className="text-mainColor font-semibold text-lg">
              {formatMoneyVN(totalPrice)}
            </span>
            <div className="flex flex-row items-center mt-1">
              <span className=" font-semibold text-black ">
                {totalPrice / 1000}
              </span>
              <Img
                src={roundTeaLeavesIcon}
                width={14}
                height={14}
                className={"ml-2 mt-[2px]"}
              />
            </div>
          </div>
        </div>
        <Button>
          <a href="https://test-applinks.momo.vn/payment?action=payWithApp&isScanQR=false&serviceType=app&sid=TU9NT0JLVU4yMDE4MDUyOXw0NDVGNkNFRTE2&v=2.3">
            Open
          </a>
        </Button>
      </div>
    </div>
  );
}

export default ConfirmOrder;
