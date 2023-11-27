import React from "react";
import Img from "../../components/Img";
import { teaOutlineIcon } from "../../assets/icons";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import { PAGE_NAMES } from "../../constants/pagesName";

function SendOTP() {
  const { state } = useLocation();
  const navigate = useNavigate();
  return (
    <div className="flex flex-col justify-center items-center  h-[100vh] p-6">
      <span className="text-center text-xl font-medium mb-4">
        Enter the OTP sent to your message
      </span>
      <p className="text-center text-textSubdued w-3/4">
        Enter your phone number and the system will send a 4-character OTP in
        the message
      </p>
      <span className="mt-6 text-start w-full">Phone</span>
      <span className="text-start w-full mt-2 text-lg">
        {state.phoneNumber}
      </span>

      <Button
        className="mt-12"
        onClick={() =>
          navigate(PAGE_NAMES.VERIFY_PHONE_NUMBER, {
            state: { phoneNumber: state.phoneNumber },
          })
        }
      >
        Send verify code
      </Button>
      <Img
        src={teaOutlineIcon}
        width={200}
        height={200}
        className="fixed bottom-0 right-0"
      />
    </div>
  );
}

export default SendOTP;
