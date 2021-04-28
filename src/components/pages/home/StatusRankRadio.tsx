import { MouseEventHandler } from "react";
import { TadunaRank, TadunaRankCallback } from "../../../data/RaceEntry";
import styles from "./StatusRankRadio.module.scss";

export type OnStatusRankRadioChange = (name: string, value: TadunaRank) => void;

export const StatusRankRadio: React.FC<{
  checked: boolean;
  label: string;
  name: string;
  onChange: OnStatusRankRadioChange;
  value: TadunaRank;
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
