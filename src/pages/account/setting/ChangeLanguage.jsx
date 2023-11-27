import React, { useState } from "react";
import Header from "../../../components/Header";
import CheckBox from "../../../components/CheckBox";
import { getItemLS, setItemLS } from "../../../utils/localStore";
import { KEYS } from "../../../constants/constants";
import Img from "../../../components/Img";
import { checkMarkBlackIcon } from "../../../assets/icons";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function ChangeLanguage() {
  const currentLanguage = getItemLS(KEYS.LANGUAGE);

  const [language, setLanguage] = useState(currentLanguage);
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  return (
    <div className="mb-16">
      <Header
        title={"Change language"}
        rightIcon={
          <Img
            src={checkMarkBlackIcon}
            className={"w-5"}
            onClick={() => {
              setItemLS(KEYS.LANGUAGE, language);
              i18n.changeLanguage(language);
              navigate(-1);
            }}
          />
        }
      />

      <div className="p-4">
        <div
          className="flex flex-row items-center p-4 bg-white rounded-lg mb-1"
          onClick={() => {
            setLanguage(KEYS.VI);
          }}
        >
          <CheckBox value={language === KEYS.VI} />
          <span className="ml-4 font-medium">Tiếng việt</span>
        </div>

        <div
          className="flex flex-row p-4 bg-white rounded-lg mb-1 items-center"
          onClick={() => {
            setLanguage(KEYS.EN);
          }}
        >
          <CheckBox value={language === KEYS.EN} />
          <span className="ml-4 font-medium">English</span>
        </div>
      </div>
    </div>
  );
}

export default ChangeLanguage;
