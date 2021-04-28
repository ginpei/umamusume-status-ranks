import { FormEventHandler } from "react";
import { RaceEntry, RaceEntryCallback } from "../../../data/RaceEntry";
import { InputBlock, InputField } from "../../stable/InputField";
import styles from "./RaceEntryForm.module.scss";
import { OnStatusRankRadioChange } from "./StatusRankRadio";
import { StatusRankSelect } from "./StatusRankSelect";

export const RaceEntryForm: React.FC<{
  entry: RaceEntry;
  onChange: RaceEntryCallback;
  onSubmit: RaceEntryCallback;
}> = ({ entry, onChange, onSubmit }) => {
  const onXxxChange: OnStatusRankRadioChange = (name, rank) => {
    const updated: RaceEntry = {
      ...entry,
      [name]: rank,
    };
    onChange(updated);
  };

  const onFormSubmit: FormEventHandler = (event) => {
    event.preventDefault();
    onSubmit(entry);
  };

  return (
    <form className={styles.root} onSubmit={onFormSubmit}>
      <div data-area="raceTitle">
        <InputField title="レース名">
          <input type="text" />
        </InputField>
      </div>
      <div data-area="speedRank">
        <InputBlock title="スピード">
          <StatusRankSelect
            name="speedRank"
            onChange={onXxxChange}
            value={entry.speedRank}
          />
        </InputBlock>
      </div>
      <div data-area="staminaRank">
        <InputBlock title="スタミナ">
          <StatusRankSelect
            name="staminaRank"
            onChange={onXxxChange}
            value={entry.staminaRank}
          />
        </InputBlock>
      </div>
      <div data-area="powerRank">
        <InputBlock title="パワー">
          <StatusRankSelect
            name="powerRank"
            onChange={onXxxChange}
            value={entry.powerRank}
          />
        </InputBlock>
      </div>
      <div data-area="gutRank">
        <InputBlock title="根性">
          <StatusRankSelect
            name="gutRank"
            onChange={onXxxChange}
            value={entry.gutRank}
          />
        </InputBlock>
      </div>
      <div data-area="intelligenceRank">
        <InputBlock title="賢さ">
          <StatusRankSelect
            name="intelligenceRank"
            onChange={onXxxChange}
            value={entry.intelligenceRank}
          />
        </InputBlock>
      </div>
      <button data-area="submit">OK</button>
    </form>
  );
};
