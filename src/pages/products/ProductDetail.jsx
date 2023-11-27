import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import Img from "../../components/Img";
import { formatMoney, formatMoneyVN } from "../../utils/appUtils";
import { HeaderTransparent } from "../../components/Header";
import {
  backWhiteIcon,
  heartFillIcon,
  heartOutlineIcon,
} from "../../assets/icons";
import { getItemLS, setItemLS } from "../../utils/localStore";
import { KEYS } from "../../constants/constants";
import Button from "../../components/Button";
import ToppingModal from "./toppingModal/ToppingModal";

function Product() {
  const { state } = useLocation();
  const productData = state?.product;
  const [productFavorite, setProductFavorite] = useState(
    getItemLS(KEYS.PRODUCT_FAVORITE)
  );
  const [activeToppingModal, setActiveToppingModal] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  // handle set product favorite to local storage
  useEffect(() => {
    setItemLS(KEYS.PRODUCT_FAVORITE, productFavorite);
    setIsFavorite(() =>
      productFavorite?.find((product) => product.id === productData.id)
    );
  }, [productFavorite, productData.id]);

  const handleSetProductFavorite = () => {
    if (isFavorite) {
      const newArrProduct = productFavorite.filter(
        (product) => product.id !== productData.id
      );

      setProductFavorite(newArrProduct);
    } else {
      setProductFavorite((prev) => [...prev, productData]);
    }
  };

  return (
    <>
      <div className=" mb-32">
        <HeaderTransparent>
          <Img src={backWhiteIcon} />
          <Img
            src={isFavorite ? heartFillIcon : heartOutlineIcon}
            onClick={() => handleSetProductFavorite()}
          />
        </HeaderTransparent>
        <Img src={productData.thumbnail} className={"w-full"} />

        <div className="p-4">
          <p className="font-semibold mt-2 text-xl">{productData.item_name}</p>
          <p className="text-mainColor text-3xl mt-2 font-bold">
            {formatMoneyVN(productData.list_price)}
          </p>

          <p className="text-textSubdued font-medium mt-2">
            {formatMoney(productData.list_price * 0.3)} vi +{" "}
            {formatMoney(productData.list_price * 0.7)} coin
          </p>

          <p className="mt-6 font-semibold">Thông tin sản phẩm</p>
        </div>
        <div className="fixed bottom-0 p-4 w-full">
          <Button onClick={() => setActiveToppingModal(true)}>Buy</Button>
        </div>
      </div>
      {activeToppingModal && (
        <ToppingModal
          product={productData}
          onClose={() => setActiveToppingModal(false)}
        />
      )}
    </>
  );
}

export default Product;
