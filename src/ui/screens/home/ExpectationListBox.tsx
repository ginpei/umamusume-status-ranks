import {
  ExpectationLevel,
  ExpectationLevelCallback,
  expectationLevels,
  expectationToSymbol,
  isExpectationLevel,
} from "../../../data/RaceEntry";
import { NiceListBox, NiceListBoxOption } from "../../stateful/NiceListBox";

const expectationLevelOptions: NiceListBoxOption[] = expectationLevels.map(
  (v) => ({
    name: expectationToSymbol(v),
    value: v,
  })
);

export const ExpectationListBox: React.FC<{
  disabled: boolean;
  title: string;
  onChange: ExpectationLevelCallback;
  value: ExpectationLevel;
}> = ({ disabled, title, onChange, value }) => {
  const onSelectionChange = (level: string | undefined) => {
    if (!level) {
      return;
    }

    if (!isExpectationLevel(level)) {
      throw new Error(`Unknown expectation level: ${level}`);
    }

    onChange(level);
  };

  return (
    <NiceListBox
      disabled={disabled}
      label={title}
      onChange={onSelectionChange}
      options={expectationLevelOptions}
      value={value}
    />
  );
};
