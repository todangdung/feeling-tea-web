import React, { useState } from "react";
import Button from "../../components/Button";
import {
  facebookIcon,
  googleIcon,
  logoOutlineIcon,
  teaOutlineIcon,
} from "../../assets/icons";
import Img from "../../components/Img";
import { checkUser } from "../../services/api/signinApis";
import { useNavigate } from "react-router-dom";
import { PAGE_NAMES } from "../../constants/pagesName";
import { API_ERROR_CODES } from "../../constants/apiErrorCode";
import { useDispatch } from "react-redux";
import { notiPopupStorage } from "../../redux/slice/notiPopupSlice";

function Login() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const disptach = useDispatch();

  const navigate = useNavigate();

  const handleLogin = async () => {
    checkUser({
      phoneNumber: `${phoneNumber}`,
      onSuccess: () =>
        navigate(PAGE_NAMES.PASSWORD_VERIFICATION, {
          state: { phoneNumber: phoneNumber },
        }),
      onError: (err) => {
        if (err.error_code === API_ERROR_CODES.USER_NOT_FOUND) {
          navigate(PAGE_NAMES.SEND_OTP, {
            state: { phoneNumber: phoneNumber },
          });
        } else {
          disptach(
            notiPopupStorage({
              title: "Khong thanh cong",
              message: err.error_message,
            })
          );
        }
      },
    });
  };

  return (
    <div className="flex flex-col items-center p-4">
      <Img className="mt-12" src={logoOutlineIcon} width={250} />

      <span className="text-xl mt-2 font-medium">
        Please enter your phone number
      </span>
      <input
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value.replace(/[^0-9]+/g, ""))}
        type="text"
        placeholder="0000 000 000"
        className="block w-full text-center focus:outline-none text-3xl placeholder:text-3xl mt-4"
      />

      <Button
        disable={phoneNumber.length <= 9}
        onClick={handleLogin}
        className="mt-12"
      >
        LOGIN
      </Button>
      <span className="my-6 text-textSubdued text-sm">Or by logging in</span>
      <div className="flex flex-row">
        <div className="p-3 border-[1px] border-borderColor rounded-full mx-4">
          <Img src={facebookIcon} />
        </div>

        <div className="p-3 border-[1px] border-borderColor rounded-full mx-4">
          <Img src={googleIcon} />
        </div>
      </div>
      <Img
        src={teaOutlineIcon}
        width={200}
        height={200}
        className="fixed bottom-0 right-0"
      />
    </div>
  );
}

export default Login;
