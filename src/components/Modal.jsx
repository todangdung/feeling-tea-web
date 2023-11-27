import React from "react";
import Button from "./Button";

function Modal(props) {
  return (
    <>
      {props.active && (
        <div className="top-0 fixed w-full h-full flex items-center justify-center bg-overlay z-50 ">
          <div className="p-5 w-full">
            <div className="bg-white opacity-100 rounded-2xl flex flex-col items-center justify-center px-6 py-4 animate-fadeIn w-full">
              {props.children}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Modal;
