import PropTypes from "prop-types";

function CheckBox(props) {
  return (
    <div className=" w-fit">
      <label className="relative cursor-pointer">
        <input
          type="checkbox"
          className="sr-only peer"
          checked={props.value}
          readOnly
        />
        <div
          onClick={() => {
            props.onChange && props.onChange();
          }}
          className="border-mainColor border-[1px] w-4 h-4 rounded-full after:absolute after:top-1 after:left-1  after:rounded-full after:h-2 after:w-2 peer-checked:after:bg-mainColor after:bg-white"
        ></div>
      </label>
    </div>
  );
}
CheckBox.propTypes = {
  value: PropTypes.bool.isRequired,
  onChange: PropTypes.func,
};
export default CheckBox;
