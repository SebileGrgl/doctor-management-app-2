import { MultiSelectProps, Test } from "@/types/types";
import styles from "./MultiSelectTestOptions.module.scss";

const MultiSelectTestOptions: React.FC<MultiSelectProps> = ({
  options,
  selectedOptions,
  setSelectedOptions,
}) => {
  const handleSelect = (option: Test) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  return (
    <div className={styles.selectOptionsContainer}>
      {options.map((option) => (
        <label key={option.id}>
          <input
            className={styles.checkBox}
            type="checkbox"
            value={option.name}
            checked={selectedOptions.includes(option)}
            onChange={() => handleSelect(option)}
          />
          {option.name}
        </label>
      ))}
    </div>
  );
};

export default MultiSelectTestOptions;
