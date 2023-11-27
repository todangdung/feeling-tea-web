import React, { useState } from "react";
import Header from "../../components/Header";
import Img from "../../components/Img";
import { QRCodeSVG } from "qrcode.react";
import { downloadIcon, logoIcon, shareIcon } from "../../assets/icons";
import { useSelector } from "react-redux";
import Button from "../../components/Button";

function Introduce() {
  const { contact_phone } = useSelector((state) => state.user.value);
  const [code, setCode] = useState("");

  return (
    <div className="mb-20">
      <Header
        title={"Introduce"}
        bgMainColor
        className={"text-white z-30"}
        backWhite
      />

      <div className="w-[100vw] h-72 bg-mainColor fixed -z-10 top-0"></div>

      <div className="pt-16"></div>
      <div className="p-5 mt-2 relative">
        <div className="bg-bgColor px-8 py-6 flex flex-col items-center justify-center rounded-xl ">
          <div className="w-[200px]">
            <p className="w-full text-center mb-6 font-medium text-sm">
              Help your friends around you know and experience Feeling Tea
              together!
            </p>
            <QRCodeSVG
              className=" w-full"
              value={contact_phone}
              size={200}
              bgColor={"#F9F1EA"}
              fgColor={"#000000"}
              level={"L"}
              imageSettings={{
                src: logoIcon,
                x: undefined,
                y: undefined,
                height: 36,
                width: 36,
                excavate: true,
              }}
            />
            <p className="mt-4 text-center">
              Referral code:{" "}
              <span className=" font-medium">{contact_phone}</span>
            </p>
          </div>
        </div>
        <div className="flex flex-row w-full">
          <Button className={"mx-2 rounded-lg"}>
            <div className="flex flex-row justify-center items-center">
              <Img src={shareIcon} />
              <span className="ml-2">Share</span>
            </div>
          </Button>
          <Button className={"mx-2 rounded-lg"}>
            <div className="flex flex-row justify-center items-center">
              <Img src={downloadIcon} />
              <span className="ml-2">Download QR</span>
            </div>
          </Button>
        </div>
        <div>
          <p className=" font-medium mb-2">
            You receive an invitation from a friend?
          </p>
          <input
            className="w-full bg-bgColor border-[1px] border-textSubdued rounded-lg py-1 px-2 my-2"
            placeholder="Enter their referrnal code in here"
          />
        </div>
        <div>
          <p className=" font-semibold mt-3 mb-2">How it works?</p>
          <p className=" text-textSubdued">
            1: Giới thiệu 1 người nhận được 10.000 tiền vào ví cash
          </p>
          <p className=" text-textSubdued">
            2: Điều kiện nhận thưởng giới thiệu: Nhập số điện thoại người giới
            thiệu; người được giới thiệu phải nạp tiền và tiêu dùng cho 1 sản
            phẩm thì người giới thiệu mới nhận được tiền.
          </p>
          <p className=" text-textSubdued">
            3: Điều kiện nhận tiền giới thiệu: B tiêu dùng tiền mặt hoặc coin
            qua App thì A sẽ được hưởng 1% tiêu dùng của B.
          </p>
          <p className=" text-textSubdued">
            4: Thưởng giới thiệu này sẽ được nhận vào tháng sau đó vào Ví
            Feeling Tea.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Introduce;
