import React from "react";
import Button from "./Button";
import { useDispatch, useSelector } from "react-redux";
import { clearNotiPopup } from "../redux/slice/notiPopupSlice";

function NotiPopup() {
  const notiPopupData = useSelector((state) => state.notiPopup);
  const dispatch = useDispatch();

  return (
    <>
      {notiPopupData.active && (
        <div className="top-0 fixed w-full h-full flex items-center justify-center bg-overlay z-50 ">
          <div className=" w-4/5 bg-white opacity-100 rounded-2xl flex flex-col items-center justify-center p-4 px-8 animate-fadeIn">
            <span className="text-xl my-2 font-medium">
              {notiPopupData.title || "Notification"}
            </span>
            <p className="text-center text-textSubdued mb-2">
              {notiPopupData.message}
            </p>
            <Button onClick={() => dispatch(clearNotiPopup())}>Agree</Button>
          </div>
        </div>
      )}
    </>
  );
}

export default NotiPopup;
