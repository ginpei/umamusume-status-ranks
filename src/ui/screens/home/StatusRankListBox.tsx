import {
  isTadunaRank,
  TadunaRank,
  TadunaRankCallback,
  tadunaRanks,
  tadunaRankToSymbol,
} from "../../../data/RaceEntry";
import {
  NiceListBox,
  NiceListBoxOption,
  SymbolSelectionChangeHandler,
} from "../../stateful/NiceListBox";

const tadunaRankOptions: NiceListBoxOption[] = tadunaRanks.map((v) => ({
  name: tadunaRankToSymbol(v),
  value: v,
}));

export const StatusRankListBox: React.FC<{
  disabled: boolean;
  title: string;
  onChange: TadunaRankCallback;
  value: TadunaRank;
}> = ({ disabled, title, onChange, value }) => {
  const onSelectionChange: SymbolSelectionChangeHandler = (selection) => {
    if (!isTadunaRank(selection)) {
      return;
    }

    onChange(selection);
  };

  return (
    <NiceListBox
      disabled={disabled}
      label={title}
      onChange={onSelectionChange}
      options={tadunaRankOptions}
      value={value}
    />
  );
};
