import { ChangeEventHandler, FormEventHandler } from "react";
import {
  ExpectationList,
  RaceEntry,
  RaceEntryCallback,
} from "../../../data/RaceEntry";
import {
  GpCheckbox,
  GpCheckboxChangeHandler,
} from "../../../gp/components/stable/GpCheckbox";
import { InputBlock, InputField } from "../../stable/InputField";
import {
  ExpectationSelect,
  OnExpectationRadioChange,
} from "./ExpectationSelect";
import styles from "./RaceEntryForm.module.scss";
import { StatusInput } from "./StatusInput";
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
    <form className={styles.root} onSubmit={onFormSubmit}>
      <div data-area="umaName">
        <InputField title="ウマ娘">
          <input
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
        <InputField title="級">
          <UmaClassSelect
            disabled={disabled}
            name="umaClass"
            onChange={onUmaClassChange}
            value={entry.umaClass}
          />
        </InputField>
      </div>
      <div data-area="raceTitle">
        <InputField title="レース名">
          <input
            disabled={disabled}
            name="raceTitle"
            onChange={onValueChange}
            required
            type="text"
            value={entry.raceTitle}
          />
        </InputField>
      </div>
      <div data-area="speedRank">
        <InputBlock title="スピード">
          <StatusRankSelect
            disabled={disabled}
            name="speedRank"
            onChange={onRankChange}
            value={entry.speedRank}
          />
        </InputBlock>
      </div>
      <div data-area="staminaRank">
        <InputBlock title="スタミナ">
          <StatusRankSelect
            disabled={disabled}
            name="staminaRank"
            onChange={onRankChange}
            value={entry.staminaRank}
          />
        </InputBlock>
      </div>
      <div data-area="powerRank">
        <InputBlock title="パワー">
          <StatusRankSelect
            disabled={disabled}
            name="powerRank"
            onChange={onRankChange}
            value={entry.powerRank}
          />
        </InputBlock>
      </div>
      <div data-area="gutRank">
        <InputBlock title="根性">
          <StatusRankSelect
            disabled={disabled}
            name="gutRank"
            onChange={onRankChange}
            value={entry.gutRank}
          />
        </InputBlock>
      </div>
      <div data-area="intelligenceRank">
        <InputBlock title="賢さ">
          <StatusRankSelect
            disabled={disabled}
            name="intelligenceRank"
            onChange={onRankChange}
            value={entry.intelligenceRank}
          />
        </InputBlock>
      </div>
      <div data-area="status">
        <StatusInput disabled={disabled} entry={entry} onChange={onChange} />
      </div>
      <div data-area="tadunaComment">
        <InputBlock title="たづなさん評価">
          <input
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
        </InputBlock>
      </div>
      <div data-area="voteRank">
        <InputBlock title="人気順位">
          <input
            disabled={disabled}
            name="voteRank"
            onChange={onValueChange}
            required
            style={{ width: "100%" }}
            type="number"
            value={entry.voteRank}
          />
        </InputBlock>
      </div>
      <div data-area="expectation1">
        <InputBlock title="予想1">
          <ExpectationSelect
            disabled={disabled}
            name="expectation1"
            onChange={onExpectationChange}
            value={entry.expectations[0]}
          />
        </InputBlock>
      </div>
      <div data-area="expectation2">
        <InputBlock title="予想2">
          <ExpectationSelect
            disabled={disabled}
            name="expectation2"
            onChange={onExpectationChange}
            value={entry.expectations[1]}
          />
        </InputBlock>
      </div>
      <div data-area="expectation3">
        <InputBlock title="予想3">
          <ExpectationSelect
            disabled={disabled}
            name="expectation3"
            onChange={onExpectationChange}
            value={entry.expectations[2]}
          />
        </InputBlock>
      </div>
      <div data-area="commentatorComment">
        <InputBlock title="解説評価">
          <input
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
        </InputBlock>
      </div>
      <div data-area="special">
        <InputBlock title="特別">
          <GpCheckbox
            checked={false}
            label="ゴルシちゃんモード"
            name="special"
            onChange={onSpecialChange}
            value="ゴルシちゃんモード2020"
          />
        </InputBlock>
      </div>
      <button data-area="submit" disabled={disabled}>
        OK
      </button>
    </form>
  );
};
