import { ExpectationLevel } from "../../../data/RaceEntry";
import styles from "./StatusRankRadio.module.scss";

export type OnExpectationRadioChange = (
  name: string,
  level: ExpectationLevel
) => void;

export const ExpectationRadio: React.FC<{
  checked: boolean;
  label: string;
  name: string;
  onChange: OnExpectationRadioChange;
  value: ExpectationLevel;
}> = ({ checked, label, name, onChange, value }) => {
  const onInputChange = () => {
    onChange(name, value);
  };

  return (
    <label className={styles.root} data-checked={checked} tabIndex={0}>
      <input
        checked={checked}
        className={styles.input}
        name={name}
        onChange={onInputChange}
        type="radio"
        value={value}
      />
      {label}
    </label>
  );
};
