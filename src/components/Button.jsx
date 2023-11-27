import React from "react";
import PropTypes from "prop-types";

function Button(props) {
  return (
    <button
      onClick={props.disable ? null : props.onClick}
      className={
        `${props.className} my-4 font-medium w-full py-3 rounded-3xl text-white hover:bg-opacity-80 active:bg-opacity-50 ` +
        (props.disable ? "bg-disableButton" : "bg-mainColor")
      }
    >
      {props.children || "CONTINUE"}
    </button>
  );
}

Button.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  disable: PropTypes.bool,
};
export default Button;
