import { useEffect, useState } from "react";
import { getItemLS, setItemLS } from "../../utils/localStore";
import { KEYS } from "../../constants/constants";
import Product from "../../components/orderProduct/Product";

function OrderProduct() {
  const [cartData, setCartData] = useState(getItemLS(KEYS.CART));
  const [listProduct, setListProduct] = useState([]);

  useEffect(() => {
    // chuyen mang data thanh cac group san pham cung chooseTime
    if (cartData && cartData.length > 0) {
      const groupedItems = cartData.reduce((result, item) => {
        const timeChooseValue = item.time_choose;

        // Sử dụng Nullish coalescing operator (??) để tạo mảng trống nếu nhóm chưa tồn tại
        result[timeChooseValue] = result[timeChooseValue] ?? [];
        result[timeChooseValue].push(item);

        return result;
      }, {});

      setListProduct(Object.values(groupedItems));
    } else {
      setListProduct([]);
    }

    // xoa tat ca product co cung chooseTime neu san pham co so luong = 0
    const handleDeleteItem = () => {
      const timeChoose = cartData.find(
        (cart) => cart.quantity === 0
      )?.time_choose;

      if (timeChoose) {
        setCartData((prevCart) =>
          prevCart.filter((item) => item.time_choose !== timeChoose)
        );
      }

      //sau khi xoa san pham thi set lait vao local storage
      setItemLS(KEYS.CART, cartData);
    };
    handleDeleteItem();
  }, [cartData]);

  // lay san pham chinh
  const mainProduct = (products) => {
    const mainProduct = products?.find(
      (product) => product.parent_id.trim() === ""
    );

    return mainProduct;
  };

  // lay danh sach topping cua nhom san pham
  const toppings = (products) => {
    const toppings = products.filter(
      (product) => product.parent_id.trim() !== ""
    );

    return toppings;
  };

  return (
    <div className="py-2 bg-white">
      {listProduct?.map((products, index) => (
        <div key={index} className="my-3">
          <Product
            timeChoose={mainProduct(products).time_choose}
            thumbnail={mainProduct(products).thumbnail}
            item_name={mainProduct(products).item_name}
            list_price={mainProduct(products).price_list}
            quantity={mainProduct(products).quantity}
            toppings={toppings(products)}
            onClickMinus={() => {
              // xu ly khi giam so luong san pham
              setCartData((prevCart) =>
                prevCart.map((item) =>
                  item.time_choose === mainProduct(products).time_choose &&
                  item.parent_id === ""
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
                )
              );
            }}
            // su ly tang so luong san pham
            onClickPlus={() => {
              setCartData((prevCart) =>
                prevCart.map((item) =>
                  item.time_choose === mainProduct(products).time_choose &&
                  item.parent_id === ""
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
                )
              );
              // tang so luong xong thi set carts vao local storage
              setItemLS(KEYS.CART, cartData);
            }}
          />
        </div>
      ))}
    </div>
  );
}

export default OrderProduct;
