import React from "react";
import Header from "../../components/Header";
import { useSelector } from "react-redux";
import { QRCodeSVG } from "qrcode.react";
import { walletTeaIcon } from "../../assets/icons";
import Button from "../../components/Button";

function PaymentCode() {
  const { contact_phone } = useSelector((state) => state.user.value);
  const { hotline } = useSelector((state) => state.appConfig.value);

  return (
    <div>
      <Header title={"Ma thanh toan"} transparent backWhite />

      <div className="fixed h-screen bg-mainColor w-full -z-10 top-0"></div>
      <div className="flex flex-col p-6 w-full mt-12 justify-center items-center">
        <div className="bg-white p-6 w-fit rounded-xl">
          <div className="border-2 border-mainColor rounded-xl p-10">
            <QRCodeSVG
              className=" w-full"
              value={contact_phone}
              size={250}
              bgColor={"#F9F1EA"}
              fgColor={"#000000"}
              level={"L"}
              imageSettings={{
                src: walletTeaIcon,
                x: undefined,
                y: undefined,
                height: 48,
                width: 48,
              }}
            />
          </div>

          <p className=" text-center py-8 pb-6 text-4xl text-mainColor font-semibold">
            {contact_phone}
          </p>
        </div>
        <Button className={"bg-white w-full mt-6"}>
          <p className="text-mainColor text-sm">
            Luon luon san sang ho tro: {hotline}
          </p>
        </Button>
      </div>
    </div>
  );
}

export default PaymentCode;
