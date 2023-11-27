import PropTypes from "prop-types";
import React, { useState } from "react";

function Input(props) {
  const [focusInput, setFocusInput] = useState(false);

  return (
    <div className={props.className}>
      <p
        className={
          "mt-2 text-start w-full font-semibold " +
          (focusInput ? "text-mainColor" : "")
        }
      >
        {props.label}
      </p>
      <input
        placeholder={props.placeholder}
        disabled={props.disable}
        onChange={(e) => props.onchange(e.target.value)}
        onBlur={() => setFocusInput(false)}
        onFocus={() => setFocusInput(true)}
        className="text-start w-ful text-lg focus:outline-none mt-1 placeholder:text-textSubdued placeholder:text-sm"
        value={props.value}
      />
    </div>
  );
}

Input.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  label: PropTypes.string,
  disable: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onchange: PropTypes.func,
  placeholder: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};
export default Input;
