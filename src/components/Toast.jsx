import Img from "./Img";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { TYPES_TOAST } from "../constants/constants";
import { errorIcon, successIcon } from "../assets/icons";
import { clearToast } from "../redux/slice/toastSlice";

function Toast() {
  const { active, message, type } = useSelector((state) => state.toast);
  const dispatch = useDispatch();

  useEffect(() => {
    if (active) {
      setTimeout(() => {
        dispatch(clearToast());
      }, 4000);
    }
  }, [active]);
  return (
    <>
      {active && (
        <div
          className={
            "border-[1px] text-black p-2 rounded-lg flex flex-row absolute max-w-[300px] min-w-[300px] left-0 right-0 m-auto top-4 animate-slideUpDown z-50 " +
            (type === TYPES_TOAST.ERROR
              ? "bg-[#fff2f2]  border-red"
              : "bg-[#f5fff6]  border-green")
          }
        >
          <Img
            src={type === TYPES_TOAST.ERROR ? errorIcon : successIcon}
            width={30}
          />
          <div className="ml-3">
            <p className="font-bold">
              {type === TYPES_TOAST.ERROR ? "Error" : "Success"}
            </p>
            <p>{message}</p>
          </div>
        </div>
      )}
    </>
  );
}

//animate-slideUpDown
Toast.propTypes = {
  active: PropTypes.bool,
  content: PropTypes.string,
};
export default Toast;
