import {
  TadunaRank,
  tadunaRanks,
  tadunaRankToSymbol,
} from "../../../data/RaceEntry";
import { VRadioGroup } from "../../stable/VRadioGroup";

export type OnStatusRankRadioChange = (name: string, value: TadunaRank) => void;

export const StatusRankSelect: React.FC<{
  disabled: boolean;
  name: string;
  onChange: OnStatusRankRadioChange;
  value: TadunaRank;
}> = ({ disabled, name, onChange, value }) => {
  const labels = tadunaRanks.map((v) => tadunaRankToSymbol(v));
  return (
    <VRadioGroup
      disabled={disabled}
      labels={labels}
      name={name}
      onChange={onChange}
      options={tadunaRanks}
      value={value}
    />
  );
};
