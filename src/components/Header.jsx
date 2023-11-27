import React from "react";
import PropTypes from "prop-types";
import Img from "./Img";
import { backBlackIcon, backWhiteIcon, settingIcon } from "../assets/icons";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Header(props) {
  const { t } = useTranslation();
  const {
    className,
    title,
    transparent,
    backWhite,
    disableBack,
    rightIcon,
    bgMainColor,
  } = props;
  const navigate = useNavigate();
  return (
    <div>
      <div className="fixed h-screen bg-bgColor w-full -z-10"></div>
      <div
        className={
          `${
            transparent
              ? "bg-transparent"
              : bgMainColor
              ? "bg-mainColor"
              : "bg-white"
          } z-40 h-16 fixed w-screen top-0 flex items-center justify-between border-b-[1px] border-disableButton ` +
          className
        }
      >
        {!disableBack && !backWhite && (
          <Img
            src={backBlackIcon}
            className={"ml-4 z-50 relative"}
            onClick={() => {
              navigate(-1);
            }}
          />
        )}

        {backWhite && (
          <Img
            src={backWhiteIcon}
            className={"ml-4 z-50 relative"}
            onClick={() => {
              navigate(-1);
            }}
          />
        )}

        {rightIcon && <div className={"mr-4 z-50 relative"}>{rightIcon}</div>}
        <p
          className={`absolute w-full mx-auto text-center text-lg font-medium block grow ${
            transparent ? "text-white" : ""
          }`}
        >
          {title}
        </p>
        {/* <Img src={settingIcon} /> */}
      </div>
      <div className=" relative z-10 pt-16"></div>
    </div>
  );
}
Header.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  transparent: PropTypes.bool,
};

function HeaderTransparent(props) {
  const { className, children } = props;
  return (
    <div>
      {/* <div className="fixed h-screen bg-bgColor w-full -z-10"></div> */}
      <div
        className={
          ` h-16 fixed w-screen top-0 flex items-center justify-between px-4 ` +
          className
        }
      >
        {children}
      </div>
    </div>
  );
}

export { HeaderTransparent };
export default Header;
