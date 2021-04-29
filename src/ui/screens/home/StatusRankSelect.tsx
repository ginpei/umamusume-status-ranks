import { tadunaRanks, tadunaRankToSymbol } from "../../../data/RaceEntry";
import { OnStatusRankRadioChange, StatusRankRadio } from "./StatusRankRadio";
import styles from "./StatusRankSelect.module.scss";

export const StatusRankSelect: React.FC<{
  disabled: boolean;
  name: string;
  onChange: OnStatusRankRadioChange;
  value: string;
}> = ({ disabled, name, onChange, value }) => {
  return (
    <span className={styles.root}>
      {tadunaRanks.map((key) => (
        <StatusRankRadio
          checked={key === value}
          disabled={disabled}
          key={key}
          label={tadunaRankToSymbol(key)}
          name={name}
          onChange={onChange}
          value={key}
        />
      ))}
    </span>
  );
};
