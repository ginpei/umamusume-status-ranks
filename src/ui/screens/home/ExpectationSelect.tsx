import {
  expectationLevels,
  expectationToSymbol,
} from "../../../data/RaceEntry";
import { ExpectationRadio, OnExpectationRadioChange } from "./ExpectationRadio";
import styles from "./StatusRankSelect.module.scss";

export const ExpectationSelect: React.FC<{
  disabled: boolean;
  name: string;
  onChange: OnExpectationRadioChange;
  value: string;
}> = ({ disabled, name, onChange, value }) => {
  return (
    <span className={styles.root}>
      {expectationLevels.map((key) => (
        <ExpectationRadio
          checked={key === value}
          disabled={disabled}
          key={key}
          label={expectationToSymbol(key)}
          name={name}
          onChange={onChange}
          value={key}
        />
      ))}
    </span>
  );
};
