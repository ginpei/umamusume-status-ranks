import { TadunaRank } from "../../../data/RaceEntry";
import styles from "./StatusRankRadio.module.scss";

export type OnStatusRankRadioChange = (name: string, value: TadunaRank) => void;

export const StatusRankRadio: React.FC<{
  checked: boolean;
  disabled: boolean;
  label: string;
  name: string;
  onChange: OnStatusRankRadioChange;
  value: TadunaRank;
}> = ({ disabled, checked, label, name, onChange, value }) => {
  const onInputChange = () => {
    onChange(name, value);
  };

  return (
    <label
      className={styles.root}
      data-checked={checked}
      data-disabled={disabled}
      tabIndex={0}
    >
      <input
        checked={checked}
        className={styles.input}
        disabled={disabled}
        name={name}
        onChange={onInputChange}
        type="radio"
        value={value}
      />
      {label}
    </label>
  );
};
