import React, { useEffect, useState } from "react";
import Img from "../Img";
import {
  minusIcon,
  plusActiveIcon,
  roundTeaLeavesIcon,
} from "../../assets/icons";
import { formatMoney, formatMoneyVN } from "../../utils/appUtils";
import { useDispatch } from "react-redux";
import { totalPriceStorage } from "../../redux/slice/totalPriceSlice";

const Product = (props) => {
  const {
    thumbnail,
    item_name,
    list_price,
    onClickMinus,
    onClickPlus,
    quantity,
    toppings,
    timeChoose,
  } = props;

  const [stringTopping, setStringTopping] = useState();
  const [totalMProductPrice, setTotalMProductPrice] = useState(0);
  const [totalToppingPrice, setTotalToppingPrice] = useState(0);
  const [reload, setReload] = useState(false);
  const dispatch = useDispatch();

  // lay ten danh sach topping
  useEffect(() => {
    if (toppings) {
      let nameArray = toppings?.map((item) => item.item_name);
      setStringTopping(nameArray.join(", "));
    }
  }, []);

  // tinh tong tien topping va tong tien san pham dua vao so luong
  useEffect(() => {
    if (toppings) {
      const toppingMoney = toppings.reduce((totalMoney, topping) => {
        return totalMoney + topping.price_list;
      }, 0);

      setTotalToppingPrice(toppingMoney * quantity);
      setTotalMProductPrice(list_price * quantity);
    }
  }, [list_price, quantity, toppings]);

  // moi khi so luong thay doi hoac them san pham moi vao gio hang thi dispatch tong tien len store
  useEffect(() => {
    let totalMoney = totalMProductPrice + totalToppingPrice;

    if (quantity === 0) {
      totalMoney = 0;
    }
    if (timeChoose) {
      dispatch(
        totalPriceStorage({
          timeChoose: timeChoose,
          value: totalMoney,
        })
      );
    }
  }, [timeChoose, totalMProductPrice, totalToppingPrice, reload, quantity]);

  return (
    <div className="bg-bgColor ">
      <div className="flex flex-row items-center pb-6 bg-white pt-4 px-4 w-full">
        <Img src={thumbnail} className={"w-20 h-full mr-2 rounded-lg"} />
        <div className="w-full flex flex-row justify-between items-center">
          <div className="w-full">
            <p className=" font-semibold mb-2">{item_name}</p>

            {toppings ? (
              <p className=" text-textSubdued text-xs font-semibold mb-2">
                {stringTopping}
              </p>
            ) : (
              <p className="text-mainColor text-sm font-semibold mb-2">
                {formatMoney(list_price)}đ
              </p>
            )}

            <div className="flex flex-row items-center justify-between">
              <div className="flex flex-row items-center">
                {toppings ? (
                  <p className="text-mainColor text-sm font-medium">
                    {formatMoneyVN(totalMProductPrice + totalToppingPrice)}
                    <span className="text-black ml-3">
                      {formatMoneyVN(
                        (totalMProductPrice + totalToppingPrice) / 1000
                      )}
                    </span>
                  </p>
                ) : (
                  <p className="text-textSubdued text-sm font-medium">
                    {formatMoney(list_price * 0.3)} vi +{" "}
                    {formatMoney(list_price * 0.7)} coin
                  </p>
                )}

                <Img
                  src={roundTeaLeavesIcon}
                  width={14}
                  height={14}
                  className={"ml-2 mt-[2px]"}
                />
              </div>
              <div className="flex flex-row items-center">
                <div
                  onClick={() => {
                    setReload(!reload);
                    onClickMinus();
                  }}
                  className={
                    "border-disableButton border-[0.5px] rounded-full p-1 mr-1"
                  }
                >
                  <Img src={minusIcon} width={20} />
                </div>
                <span className="mx-2 font-medium">{quantity}</span>
                <div
                  onClick={() => {
                    setReload(!reload);
                    onClickPlus();
                  }}
                  className={
                    "border-disableButton border-[0.5px] rounded-full p-1 ml-1"
                  }
                >
                  <Img src={plusActiveIcon} width={20} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
