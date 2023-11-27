import React, { useRef, useState } from "react";
import Img from "../../components/Img";
import { teaOutlineIcon } from "../../assets/icons";
import Button from "../../components/Button";

function VerifyPhoneNumber() {
  const [arrOtp, setArrOtp] = useState(["", "", "", ""]);

  const [change, setChange] = useState(false);

  const input_1 = useRef(null);
  const input_2 = useRef(null);
  const input_3 = useRef(null);
  const input_4 = useRef(null);

  const arrayInput = [input_1, input_2, input_3, input_4];

  return (
    <div className="flex flex-col items-center p-6">
      <span className="text-2xl font-medium mt-52">
        Verify your phone number
      </span>
      <span className="mt-6 text-textSubdued">
        Enter the OTP sent to your message
      </span>

      <div className="flex flex-row mt-6">
        {arrOtp.map((valueOtp, key) => {
          return (
            <input
              key={key}
              ref={arrayInput[key]}
              value={valueOtp}
              onChange={(newValue) => {
                const formatValue = newValue.target.value.replace(
                  /[^0-9]+/g,
                  ""
                );

                if (arrOtp[key].length === 0 && formatValue.length === 1) {
                  arrOtp[key] = formatValue;
                  setArrOtp(arrOtp);
                  setChange(!change);
                  if (key < arrOtp.length - 1) {
                    arrayInput[key + 1].current.focus();
                  }
                }

                if (formatValue.length === 0) {
                  arrOtp[key] = formatValue;
                  setArrOtp(arrOtp);
                  setChange(!change);
                }
              }}
              type="text"
              className="border-[1px] border-borderColor w-14 h-14 rounded-xl m-3 text-center text-2xl"
            />
          );
        })}
      </div>

      <Button className={"mt-12"}>CONTINUE</Button>
      <Img
        src={teaOutlineIcon}
        width={200}
        height={200}
        className="fixed bottom-0 right-0"
      />
    </div>
  );
}

export default VerifyPhoneNumber;
