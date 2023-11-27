import React from "react";
import PropTypes from "prop-types";

function Img(props) {
  return (
    <img
      onClick={() => props.onClick && props.onClick()}
      className={props.className || ""}
      src={props.src || ""}
      alt=""
      width={props.width || 24}
      height={props.height || 24}
      style={{ objectFit: props.cover ? "cover" : "contain" }}
    />
  );
}

Img.propTypes = {
  className: PropTypes.string,
  src: PropTypes.any,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  cover: PropTypes.bool,
  onClick: PropTypes.func,
};

export default Img;
