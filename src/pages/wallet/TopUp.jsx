import React from "react";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";
import { PAGE_NAMES } from "../../constants/pagesName";
import Img from "../../components/Img";
import {
  arrowRightActiveIcon,
  bankIcon,
  earthIconActive,
} from "../../assets/icons";
import { useDispatch } from "react-redux";
import { notiPopupStorage } from "../../redux/slice/notiPopupSlice";

function TopUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <div className="mb-16">
      <Header title={"Top up"} />
      <div className="p-4">
        <div
          className="flex flex-row item-center justify-between p-4 bg-white rounded-lg mb-1"
          onClick={() => {
            dispatch(
              notiPopupStorage({
                message: "Chuc nang nay dang trong qua trinh phat trien",
              })
            );
          }}
        >
          <div className="flex flex-row items-center">
            <Img src={bankIcon} className={"w-12"} />
            <span className="ml-4 font-medium">Chuyển khoản ngân hàng</span>
          </div>
          <Img src={arrowRightActiveIcon} width={12} height={12} />
        </div>
      </div>
    </div>
  );
}

export default TopUp;
