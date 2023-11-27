import React, { useState } from "react";
import Header from "../../../components/Header";
import Img from "../../../components/Img";
import {
  arrowRightActiveIcon,
  bellActiveIcon,
  earthIconActive,
  infoIconActive,
} from "../../../assets/icons";
import Switch from "../../../components/Switch";
import { useNavigate } from "react-router-dom";
import { PAGE_NAMES } from "../../../constants/pagesName";

function Setting() {
  const [isNoti, setIsNoti] = useState(true);
  const navigate = useNavigate();

  return (
    <div className="mb-20">
      <Header title={"Setting"} />

      <div className="p-4">
        <p className=" font-medium text-textSubdued mb-2 ml-3">Other</p>

        <div
          className="flex flex-row item-center justify-between p-4 bg-white rounded-lg mb-1"
          onClick={() => {
            navigate(PAGE_NAMES.CHANGE_LANGUAGE);
          }}
        >
          <div className="flex flex-row item-center">
            <Img src={earthIconActive} />
            <span className="ml-4 font-medium">Language</span>
          </div>
          <Img src={arrowRightActiveIcon} width={12} height={12} />
        </div>
        <div className="flex flex-row item-center justify-between p-4 bg-white rounded-lg">
          <div className="flex flex-row item-center">
            <Img src={bellActiveIcon} />
            <span className="ml-4 font-medium">Notification</span>
          </div>
          <Switch value={isNoti} onChange={() => setIsNoti(!isNoti)} />
        </div>

        <p className=" font-medium text-textSubdued mb-2 ml-3 mt-4">About us</p>

        <div className="flex flex-row item-center justify-between p-4 bg-white rounded-lg mb-1">
          <div className="flex flex-row item-center">
            <Img src={infoIconActive} />
            <span className="ml-4 font-medium">Language</span>
          </div>
        </div>

        <p className="font-medium text-textSubdued mt-6 text-center">
          Delete account
        </p>
      </div>
    </div>
  );
}

export default Setting;
