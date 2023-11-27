import CheckBox from "../../../components/CheckBox";
import { formatMoney } from "../../../utils/appUtils";

const CustomizationTopping = (props) => {
  const { customization, options } = props;
  let newOptions = options;

  // xu li khi chon topping
  const handleSelectTopping = ({ choseOption }) => {
    // xu li khi cho toi da 1 loai topping
    if (customization.max_permitted === 1) {
      const indexOption = newOptions.findIndex(
        (currentOption) => currentOption?.parent_id === choseOption?.parent_id
      );

      if (indexOption !== -1) {
        newOptions[indexOption] = choseOption;
      } else {
        newOptions.push(choseOption);
      }
    } else {
      // xu li khi co the chon nhieu loai topping
      const findTopping = newOptions.find(
        (currentOption) => currentOption?.id === choseOption.id
      );

      if (findTopping) {
        newOptions = newOptions.filter(
          (currentOption) => currentOption.id !== choseOption.id
        );
      } else {
        newOptions.push(choseOption);
      }
    }

    props.onSelect(newOptions);
  };

  // set checked cho radio
  const isChecked = (option) => {
    const checked = newOptions.find(
      (currentOption) => currentOption?.id === option?.id
    );

    return checked ? true : false;
  };

  return (
    <div className="pb-4 bg-white  p-4 mt-3">
      <p className="mb-3 font-medium">{customization.name}</p>
      <div>
        {customization.options.map((option) => (
          <div
            key={option.id}
            className="flex flex-row items-center justify-between border-b-[1px] border-borderColor py-3"
            onClick={() => handleSelectTopping({ choseOption: option })}
          >
            <div className="flex flex-row items-center">
              <CheckBox value={isChecked(option)} onChange={(value) => {}} />
              <span
                className={`ml-3 text-sm font-medium ${
                  isChecked(option) ? "text-black" : "text-textSubdued"
                }`}
              >
                {option.item_name}
              </span>
            </div>
            <span
              className={`ml-3 text-sm font-medium ${
                isChecked(option) ? "text-black" : "text-textSubdued"
              }`}
            >
              {option.list_price !== 0 && "+ " + formatMoney(option.list_price)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomizationTopping;
