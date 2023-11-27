import React, { useState } from "react";
import Input from "../../components/Input";
import Img from "../../components/Img";
import { teaOutlineIcon } from "../../assets/icons";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { PAGE_NAMES } from "../../constants/pagesName";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  return (
    <div className="p-4">
      <p className="mt-28 text-2xl font-medium text-center">Forgot password</p>
      <p className="text-center w-1/2 m-auto mt-4">
        Please enter your information to continue
      </p>
      <Input
        className={"mt-10"}
        label="Enter email"
        value={email}
        onchange={(newValue) => setEmail(newValue)}
        placeholder={"Enter email"}
      />
      <Button
        disable={email.length <= 7}
        onClick={() => navigate(PAGE_NAMES.VERIFY_EMAIL)}
        className="mt-12"
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

export default ForgotPassword;
