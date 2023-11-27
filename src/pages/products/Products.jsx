import { useEffect, useState } from "react";
import Header from "../../components/Header";
import { getItemCategories } from "../../services/api/userApis";
import Img from "../../components/Img";
import { formatMoney, formatMoneyVN } from "../../utils/appUtils";
import { useNavigate } from "react-router";
import { PAGE_NAMES } from "../../constants/pagesName";

function Products() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    getItemCategories({
      onSuccess: (resp) => {
        setData(resp.data);
      },
      onError: (err) => {
        console.log(err);
      },
    });
  }, []);

  return (
    <div className=" mb-32">
      <Header title={"Danh muc san pham"} disableBack />

      <div className="p-4">
        {data?.map((category, categoryIndex) => (
          <div key={categoryIndex}>
            <p className="text-xl font-medium mb-4 mt-8">
              {category.category_name}
            </p>

            <div className="flex flex-wrap w-full justify-between">
              {category.items?.map((item, itemIndex) => (
                <div
                  key={itemIndex}
                  className="w-[48%] mb-6 bg-white rounded-lg overflow-hidden"
                  onClick={() =>
                    navigate(PAGE_NAMES.PRODUCTS + "/" + category.id, {
                      state: { product: item },
                    })
                  }
                >
                  <Img src={item.thumbnail} className={"w-full h-50"} />
                  <div className="p-3">
                    <p className="mb-3 line-clamp-1">{item.item_name}</p>
                    <p className="text-mainColor font-medium">
                      {formatMoney(item.list_price)} đ
                    </p>

                    <p className="text-textSubdued text-sm">
                      {formatMoney(item.list_price * 0.3)} vi +{" "}
                      {formatMoney(item.list_price * 0.7)} coin
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
