import PropTypes from "prop-types";

function Switch(props) {
  return (
    <div>
      <label className="relative cursor-pointer">
        <input
          type="checkbox"
          className="sr-only peer"
          checked={props.value}
          readOnly
        />
        <div
          onClick={() => {
            props.onChange();
          }}
          className="bg-borderColor w-11 h-6 rounded-full peer-checked:after:translate-x-full after:absolute after:top-0.5 after:left-[2px] after:bg-textSubdued after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:bg-mainColor"
        ></div>
      </label>
    </div>
  );
}

Switch.propTypes = {
  value: PropTypes.bool.isRequired,
  onChange: PropTypes.func,
};
export default Switch;
