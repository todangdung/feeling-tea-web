import React, { useEffect, useState } from "react";
import Button from "../../../components/Button";
import { formatMoney } from "../../../utils/appUtils";
import Img from "../../../components/Img";
import { closeIcon, roundTeaLeavesIcon } from "../../../assets/icons";
import CustomizationTopping from "./CustomizationTopping";
import Input from "../../../components/Input";
import { getCurrentTimestamp } from "../../../utils/convert";
import { getItemLS, setItemLS } from "../../../utils/localStore";
import { KEYS } from "../../../constants/constants";
import { useNavigate } from "react-router-dom";
import Product from "../../../components/orderProduct/Product";
import { PAGE_NAMES } from "../../../constants/pagesName";

function ToppingModal(props) {
  const { product } = props;
  const [quantity, setQuantity] = useState(1);
  const [options, setOptions] = useState([]);
  const [productMoney, setProductMoney] = useState(product?.list_price);
  const [toppingMoney, setToppingMoney] = useState();
  const navigate = useNavigate();

  const [note, setNote] = useState("");

  // loading lai component khi options thay doi
  const [isChangeOptions, setIsChangeOptions] = useState(false);

  // setDefault options
  useEffect(() => {
    let tempOptions = [];
    product.customizations?.forEach((customization) => {
      // khi chon toi da duoc 1 loai topping thi set default la topping dau tien
      if (customization.max_permitted === 1) {
        const checkTopping = options.find(
          (topping) => topping?.parent_id === customization.id
        );

        if (!checkTopping) {
          tempOptions.push(customization.options[0]);
        }
      }
    });

    setOptions(tempOptions);
  }, []);

  // tinh tong tien cua topping topping
  useEffect(() => {
    // tinh lai tien khi them san pham
    setProductMoney(product?.list_price * quantity);

    const totalToppingMoney = options.reduce((totalMoney, topping) => {
      return totalMoney + topping.list_price;
    }, 0);

    setToppingMoney(totalToppingMoney * quantity);
  }, [options, isChangeOptions, quantity, product]);

  // set lai options bang gia tri moi
  const changeOptions = (value) => {
    setOptions(value);
    setIsChangeOptions(!isChangeOptions);
  };

  // xu li xac nhan san pham de thanh toan
  const newItem = (productItem, parentId, quantity, isNote) => {
    const newOption = {
      coin: productItem.list_price * 0.7,
      id: productItem.id,
      item_name: productItem.item_name,
      item_no: productItem.item_no,
      item_type: productItem.item_type,
      note: isNote ? note : undefined,
      parent_id: parentId ? "" : product.id,
      point: productItem.list_price * 0.3,
      price_list: productItem.list_price,
      quantity: quantity ? quantity : 1,
      thumbnail: productItem.thumbnail || "",
      time_choose: getCurrentTimestamp(),
    };

    return newOption;
  };

  const handleConfirmProduct = () => {
    let newListItem = [];
    const cartData = getItemLS(KEYS.CART);
    // them san pham vao mang voi cac truong thong tin nhu tren
    const newProduct = newItem(product, true, quantity, true);
    newListItem.push(newProduct);

    // them tuong option vao mang voi cac truong thong tin nhu tren
    options?.forEach((option) => {
      const newOption = newItem(option);
      newListItem.push(newOption);
    });

    if (cartData) {
      setItemLS(KEYS.CART, [...cartData, ...newListItem]);
    } else {
      setItemLS(KEYS.CART, [...newListItem]);
    }

    navigate(PAGE_NAMES.CONFIRM_ORDER);
  };

  // // kief tra xem tong local storage da co san pham nay chua, neu co roi thi chi tang so luong khoong them lai vao local storate
  // const checkItemCart = (newTopping) => {
  //   const cartData = getItemLS(KEYS.CART);
  //   let productExists = false;

  //   const listTopping = cartData.filter(
  //     (itemCart) => itemCart.parent_id === product.id
  //   );

  //   const mainProduct = cartData.find((itemCart) => itemCart.id === product.id);

  //   // kiem tra xem note cua san pham va length cua topping co giong nhau o ca 2 arr hay khong
  //   if (
  //     mainProduct.note === note ||
  //     listTopping?.length === newTopping?.length
  //   ) {
  //     // neu ca 2 cai o tren giong nhau thi so sanh 2 array (bo note va timechoose)
  //     newTopping.forEach((currentTopping) => {
  //       delete currentTopping.note;
  //       delete currentTopping.time_choose;
  //     });
  //   }

  //   console.log(productExists);
  // };

  return (
    <div className="fixed w-full top-0 h-full flex items-end justify-center bg-overlay z-50 ">
      <div className="bg-bgColor w-full h-[93vh] relative animate-fadeIn">
        <div className="w-full flex flex-row justify-end bg-white">
          <Img
            src={closeIcon}
            className={"w-9 h-9 pt-5 pr-5"}
            onClick={() => {
              props.onClose();
            }}
          />
        </div>
        <div className="bg-bgColor">
          <Product
            thumbnail={product.thumbnail}
            item_name={product.item_name}
            list_price={product.list_price}
            quantity={quantity}
            onClickPlus={() => {
              setQuantity((prev) => prev + 1);
            }}
            onClickMinus={() => {
              setQuantity((prev) => {
                if (prev === 1) {
                  return 1;
                } else {
                  return prev - 1;
                }
              });
            }}
          />

          <div className=" overflow-y-scroll  h-[67vh] pb-4">
            {product.customizations.map((customization) => (
              <CustomizationTopping
                customization={customization}
                key={customization.id}
                onSelect={(value) => changeOptions(value)}
                options={options}
              />
            ))}
            <div className="bg-white px-4 pb-4 mt-3">
              <Input
                placeholder={"Note"}
                label="Note"
                value={note}
                onchange={(newValue) => setNote(newValue)}
                className={"pt-[0.1px]"}
              />
            </div>
          </div>
        </div>

        <div
          className={
            "absolute bottom-0 w-full px-4 flex flex-row items-center border-t-[1px] border-borderColor bg-white"
          }
        >
          <div className="grow w-full">
            <p className="text-mainColor text-sm font-semibold mb-1">
              {formatMoney(productMoney + toppingMoney)}đ
            </p>
            <div className="flex flex-row items-center">
              <p className="text-textSubdued text-sm font-medium">
                {formatMoney(product.list_price * 0.3)} vi +{" "}
                {formatMoney(product.list_price * 0.7)} coin
              </p>
              <Img
                src={roundTeaLeavesIcon}
                width={14}
                height={14}
                className={"ml-2"}
              />
            </div>
          </div>
          <Button
            className={"w-[35%] my-[13px]"}
            onClick={() => handleConfirmProduct()}
          >
            Buy
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ToppingModal;
