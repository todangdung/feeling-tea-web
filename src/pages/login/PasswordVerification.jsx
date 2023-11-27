import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { login } from "../../services/api/signinApis";
import { KEYS } from "../../constants/constants";
import { useDispatch } from "react-redux";
import { tokenStorage } from "../../redux/slice/tokenSlice";
import { toastStorage } from "../../redux/slice/toastSlice";
import { setItemLS } from "../../utils/localStore";
import { notiPopupStorage } from "../../redux/slice/notiPopupSlice";
import { PAGE_NAMES } from "../../constants/pagesName";
import { userStorage } from "../../redux/slice/userSlice";

function PasswordVerification() {
  const { state } = useLocation();
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleVerifyPassword = () => {
    login({
      phoneNumber: state.phoneNumber,
      password: password,
      onSuccess: (resp) => {
        setItemLS(KEYS.TOKEN, resp.data.token);
        dispatch(tokenStorage(resp.data.token));
        dispatch(userStorage(resp.data));
        navigate(PAGE_NAMES.HOME, { state: { isValidated: true } });
        dispatch(toastStorage({ message: "Dang nhap thanh cong" }));
      },
      onError: (err) => {
        dispatch(
          notiPopupStorage({
            title: "Khong thanh cong",
            message: err.error_message,
          })
        );
      },
    });
  };

  return (
    <div className="p-4">
      <p className="mt-20 text-2xl font-medium">Feeling tea</p>

      <Input
        label="Phone number"
        value={state.phoneNumber}
        disable
        className={"mt-10"}
      />

      <Input
        className={"mt-10"}
        label="Enter password"
        value={password}
        onchange={(newValue) => setPassword(newValue)}
        placeholder={"Enter password"}
      />

      <p
        className="text-mainColor text-center font-medium mt-16 underline"
        onClick={() => navigate(PAGE_NAMES.FORGOT_PASSWORD)}
      >
        Forgot password?
      </p>

      <Button
        disable={password.length <= 1}
        onClick={() => handleVerifyPassword()}
        className="mt-6"
      >
        CONTINUE
      </Button>
    </div>
  );
}

export default PasswordVerification;
