import {
  ExpectationLevel,
  expectationLevels,
  expectationToSymbol,
} from "../../../data/RaceEntry";
import { VRadioGroup } from "../../stable/VRadioGroup";

export type OnExpectationRadioChange = (
  name: string,
  level: ExpectationLevel
) => void;

export const ExpectationSelect: React.FC<{
  disabled: boolean;
  name: string;
  onChange: OnExpectationRadioChange;
  value: ExpectationLevel;
}> = ({ disabled, name, onChange, value }) => {
  const labels = expectationLevels.map((v) => expectationToSymbol(v));

  return (
    <VRadioGroup
      disabled={disabled}
      labels={labels}
      name={name}
      onChange={onChange}
      options={expectationLevels}
      value={value}
    />
  );
};
