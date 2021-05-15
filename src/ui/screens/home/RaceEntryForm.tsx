import { ChangeEventHandler, FormEventHandler } from "react";
import { raceTitles } from "../../../data/Race";
import {
  ExpectationList,
  RaceEntry,
  RaceEntryCallback,
} from "../../../data/RaceEntry";
import {
  GpCheckbox,
  GpCheckboxChangeHandler,
} from "../../../gp/components/stable/GpCheckbox";
import { NiceInput } from "../../pure/NiceInput";
import { InputField, TitledField } from "../../stable/TitledField";
import {
  ExpectationSelect,
  OnExpectationRadioChange,
} from "./ExpectationSelect";
import styles from "./RaceEntryForm.module.scss";
import { OnStatusRankRadioChange, StatusRankSelect } from "./StatusRankSelect";
import { OnUmaClassChange, UmaClassSelect } from "./UmaClassSelect";

export const RaceEntryForm: React.FC<{
  disabled: boolean;
  entry: RaceEntry;
  onChange: RaceEntryCallback;
  onSubmit: RaceEntryCallback;
}> = ({ disabled, entry, onChange, onSubmit }) => {
  const onValueChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const { name, value } = event.currentTarget;

    const updated: RaceEntry = {
      ...entry,
      [name]: value,
    };
    onChange(updated);
  };

  const onUmaClassChange: OnUmaClassChange = (name, grade) => {
    const updated: RaceEntry = {
      ...entry,
      umaClass: grade,
    };
    onChange(updated);
  };

  const onRankChange: OnStatusRankRadioChange = (name, rank) => {
    const updated: RaceEntry = {
      ...entry,
      [name]: rank,
    };
    onChange(updated);
  };

  const onExpectationChange: OnExpectationRadioChange = (name, level) => {
    const newExpectations: ExpectationList = [...entry.expectations];
    if (name === "expectation1") {
      newExpectations[0] = level;
    } else if (name === "expectation2") {
      newExpectations[1] = level;
    } else if (name === "expectation3") {
      newExpectations[2] = level;
    } else {
      throw new Error(`Unknown name "${name}"`);
    }

    const updated: RaceEntry = {
      ...entry,
      expectations: newExpectations,
    };
    onChange(updated);
  };

  const onSpecialChange: GpCheckboxChangeHandler<string> = ({ checked }) => {
    const updated: RaceEntry = {
      ...entry,
      spGolshiChanMode2020: checked,
    };
    onChange(updated);
  };

  const onFormSubmit: FormEventHandler = (event) => {
    event.preventDefault();
    onSubmit(entry);
  };

  return (
    <form onSubmit={onFormSubmit}>
      <div className={styles.root}>
        <div data-area="umaName">
          <InputField title="ウマ娘">
            <NiceInput
              disabled={disabled}
              name="umaName"
              onChange={onValueChange}
              required
              type="text"
              value={entry.umaName}
            />
          </InputField>
        </div>
        <div data-area="umaClass">
          <TitledField title="級">
            <UmaClassSelect
              disabled={disabled}
              name="umaClass"
              onChange={onUmaClassChange}
              value={entry.umaClass}
            />
          </TitledField>
        </div>
        <div data-area="raceTitle">
          <InputField title="レース名">
            <NiceInput
              disabled={disabled}
              list="RaceEntryForm-raceTitle"
              name="raceTitle"
              onChange={onValueChange}
              required
              type="text"
              value={entry.raceTitle}
            />
          </InputField>
          <datalist id="RaceEntryForm-raceTitle">
            {raceTitles.map((title) => (
              <option key={title}>{title}</option>
            ))}
          </datalist>
        </div>
        <div data-area="tadunaComment">
          <InputField title="たづなさん評価">
            <NiceInput
              disabled={disabled}
              list="RaceEntryForm-tadunaComment"
              name="tadunaComment"
              onChange={onValueChange}
              placeholder="1着争い, 有力, 上位入着, 平均的"
              required
              type="text"
              value={entry.tadunaComment}
            />
            <datalist id="RaceEntryForm-tadunaComment">
              <option value="1着争い">1着争い</option>
              <option value="有力">有力</option>
              <option value="上位入着">上位入着</option>
              <option value="平均的">平均的</option>
            </datalist>
          </InputField>
        </div>
        <div data-area="speedRank">
          <TitledField title="スピード">
            <StatusRankSelect
              disabled={disabled}
              name="speedRank"
              onChange={onRankChange}
              value={entry.speedRank}
            />
          </TitledField>
        </div>
        <div data-area="staminaRank">
          <TitledField title="スタミナ">
            <StatusRankSelect
              disabled={disabled}
              name="staminaRank"
              onChange={onRankChange}
              value={entry.staminaRank}
            />
          </TitledField>
        </div>
        <div data-area="powerRank">
          <TitledField title="パワー">
            <StatusRankSelect
              disabled={disabled}
              name="powerRank"
              onChange={onRankChange}
              value={entry.powerRank}
            />
          </TitledField>
        </div>
        <div data-area="gutRank">
          <TitledField title="根性">
            <StatusRankSelect
              disabled={disabled}
              name="gutRank"
              onChange={onRankChange}
              value={entry.gutRank}
            />
          </TitledField>
        </div>
        <div data-area="intelligenceRank">
          <TitledField title="賢さ">
            <StatusRankSelect
              disabled={disabled}
              name="intelligenceRank"
              onChange={onRankChange}
              value={entry.intelligenceRank}
            />
          </TitledField>
        </div>
        <div data-area="speedStatus">
          <NiceInput
            disabled={disabled}
            name="speedStatus"
            onChange={onValueChange}
            required
            className="u-fullWidth u-textCenter"
            type="number"
            value={entry.speedStatus}
          />
        </div>
        <div data-area="staminaStatus">
          <NiceInput
            disabled={disabled}
            name="staminaStatus"
            onChange={onValueChange}
            required
            className="u-fullWidth u-textCenter"
            type="number"
            value={entry.staminaStatus}
          />
        </div>
        <div data-area="powerStatus">
          <NiceInput
            disabled={disabled}
            name="powerStatus"
            onChange={onValueChange}
            required
            className="u-fullWidth u-textCenter"
            type="number"
            value={entry.powerStatus}
          />
        </div>
        <div data-area="gutStatus">
          <NiceInput
            disabled={disabled}
            name="gutStatus"
            onChange={onValueChange}
            required
            className="u-fullWidth u-textCenter"
            type="number"
            value={entry.gutStatus}
          />
        </div>
        <div data-area="intelligenceStatus">
          <NiceInput
            disabled={disabled}
            name="intelligenceStatus"
            onChange={onValueChange}
            required
            className="u-fullWidth u-textCenter"
            type="number"
            value={entry.intelligenceStatus}
          />
        </div>
        <div data-area="voteRank">
          <InputField title="人気順位">
            <NiceInput
              disabled={disabled}
              name="voteRank"
              onChange={onValueChange}
              required
              className="u-fullWidth"
              type="number"
              value={entry.voteRank}
            />
          </InputField>
        </div>
        <div data-area="expectation1">
          <TitledField title="予想1">
            <ExpectationSelect
              disabled={disabled}
              name="expectation1"
              onChange={onExpectationChange}
              value={entry.expectations[0]}
            />
          </TitledField>
        </div>
        <div data-area="expectation2">
          <TitledField title="予想2">
            <ExpectationSelect
              disabled={disabled}
              name="expectation2"
              onChange={onExpectationChange}
              value={entry.expectations[1]}
            />
          </TitledField>
        </div>
        <div data-area="expectation3">
          <TitledField title="予想3">
            <ExpectationSelect
              disabled={disabled}
              name="expectation3"
              onChange={onExpectationChange}
              value={entry.expectations[2]}
            />
          </TitledField>
        </div>
        <div data-area="commentatorComment">
          <InputField title="解説評価">
            <NiceInput
              disabled={disabled}
              list="RaceEntryForm-commentatorComment"
              name="commentatorComment"
              onChange={onValueChange}
              placeholder="完全に上位, 素質は負けていません, 引けを取りません"
              required
              type="text"
              value={entry.commentatorComment}
            />
            <datalist id="RaceEntryForm-commentatorComment">
              <option value="実力は完全に上位">実力は完全に上位</option>
              <option value="素質は負けていません">素質は負けていません</option>
              <option value="引けを取りません">引けを取りません</option>
              <option value="逆転を狙える">逆転を狙える</option>
              <option value="これ以上ない仕上がり">これ以上ない仕上がり</option>
            </datalist>
          </InputField>
        </div>
        <div data-area="special">
          <TitledField title="特別">
            <GpCheckbox
              checked={false}
              label="ゴルシちゃんモード"
              name="special"
              onChange={onSpecialChange}
              value="ゴルシちゃんモード2020"
            />
          </TitledField>
        </div>
        <button data-area="submit" disabled={disabled}>
          OK
        </button>
      </div>
    </form>
  );
};
