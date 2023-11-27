import React from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  bagActiveIcon,
  bagIcon,
  homeActiveIcon,
  homeIcon,
  newActiveIcon,
  newIcon,
  serviceActiveIcon,
  serviceIcon,
  shopActiveIcon,
  shopIcon,
} from "../assets/icons";
import Img from "./Img";
import { PAGE_NAMES } from "../constants/pagesName";

function BottomNavigation() {
  const location = useLocation();
  const navigate = useNavigate();

  const currentPage = location.pathname;

  return (
    <>
      <Outlet />
      <div className="flex-row flex justify-around fixed w-screen bottom-0 py-3 bg-white z-50 border-t-[1px] border-borderColor">
        <div
          className="flex flex-col justify-center items-center"
          onClick={() => navigate(PAGE_NAMES.HOME)}
        >
          <Img
            src={currentPage === "/" ? homeActiveIcon : homeIcon}
            width={26}
            height={26}
            className="mb-1"
          />

          <span className={`${currentPage === "/" ? "text-mainColor" : ""}`}>
            Home
          </span>
        </div>

        <div
          className="flex flex-col justify-center items-center"
          onClick={() => navigate(PAGE_NAMES.STORE)}
        >
          <Img
            src={currentPage === PAGE_NAMES.STORE ? shopActiveIcon : shopIcon}
            width={26}
            height={26}
            className="mb-1"
          />

          <span
            className={`${
              currentPage === PAGE_NAMES.STORE ? "text-mainColor" : ""
            }`}
          >
            Store
          </span>
        </div>

        <div
          className="flex flex-col justify-center items-center"
          onClick={() => navigate(PAGE_NAMES.PRODUCTS)}
        >
          <Img
            src={currentPage === PAGE_NAMES.PRODUCTS ? bagActiveIcon : bagIcon}
            width={26}
            height={26}
            className="mb-1"
          />

          <span
            className={`${
              currentPage === PAGE_NAMES.PRODUCTS ? "text-mainColor" : ""
            }`}
          >
            Purchase
          </span>
        </div>
        <div
          className="flex flex-col justify-center items-center"
          onClick={() => navigate(PAGE_NAMES.NEWS)}
        >
          <Img
            src={currentPage === PAGE_NAMES.NEWS ? newActiveIcon : newIcon}
            width={26}
            height={26}
            className="mb-1"
          />

          <span
            className={`${
              currentPage === PAGE_NAMES.NEWS ? "text-mainColor" : ""
            }`}
          >
            News
          </span>
        </div>
        <div
          className="flex flex-col justify-center items-center"
          onClick={() => navigate(PAGE_NAMES.SERVICE)}
        >
          <Img
            src={
              currentPage === PAGE_NAMES.SERVICE
                ? serviceActiveIcon
                : serviceIcon
            }
            width={26}
            height={26}
            className="mb-1"
          />

          <span
            className={`${
              currentPage === PAGE_NAMES.SERVICE ? "text-mainColor" : ""
            }`}
          >
            Service
          </span>
        </div>
      </div>
    </>
  );
}

export default BottomNavigation;
