import { Label } from "@react-spectrum/label";
import { ActionButton } from "@react-spectrum/button";
import { Checkbox } from "@react-spectrum/checkbox";
import { Form } from "@react-spectrum/form";
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
import { TextField } from "../../../vendor/TextField";

export const RaceEntryForm: React.FC<{
  disabled: boolean;
  entry: RaceEntry;
  onChange: RaceEntryCallback;
  onSubmit: RaceEntryCallback;
}> = ({ disabled, entry, onChange, onSubmit }) => {
  // TODO replace with onValueChange2
  const onValueChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const { name, value } = event.currentTarget;

    const updated: RaceEntry = {
      ...entry,
      [name]: value,
    };
    onChange(updated);
  };

  // TODO rename
  const onValueChange2 = (name: keyof RaceEntry, value: string) => {
    let typedValue;
    if (typeof entry[name] === "string") {
      typedValue = value;
    } else if (typeof entry[name] === "number") {
      typedValue = Number(value);
    } else if (typeof entry[name] === "boolean") {
      typedValue = Boolean(value);
    } else {
      throw new Error(`Unexpected: "${name}" is "${typeof entry[name]}"`);
    }

    const updated: RaceEntry = {
      ...entry,
      [name]: typedValue,
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

  const onSpGolshiChanMode2020Change = (checked: boolean) => {
    onChange({ ...entry, spGolshiChanMode2020: checked });
  };

  // TODO delete
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
    <Form isDisabled={disabled} onSubmit={onFormSubmit}>
      <div className={styles.root}>
        <div data-area="umaName">
          <FormInputField
            entry={entry}
            label="ウマ娘"
            name="umaName"
            onChange={onValueChange2}
          />
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
          <FormInputField
            entry={entry}
            label="レース名"
            list="RaceEntryForm-raceTitle"
            name="raceTitle"
            onChange={onValueChange2}
          />
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
          <FormInputField
            entry={entry}
            name="speedStatus"
            onChange={onValueChange2}
            type="number"
          />
        </div>
        <div data-area="staminaStatus">
          <FormInputField
            entry={entry}
            name="staminaStatus"
            onChange={onValueChange2}
            type="number"
          />
        </div>
        <div data-area="powerStatus">
          <FormInputField
            entry={entry}
            name="powerStatus"
            onChange={onValueChange2}
            type="number"
          />
        </div>
        <div data-area="gutStatus">
          <FormInputField
            entry={entry}
            name="gutStatus"
            onChange={onValueChange2}
            type="number"
          />
        </div>
        <div data-area="intelligenceStatus">
          <FormInputField
            entry={entry}
            name="intelligenceStatus"
            onChange={onValueChange2}
            type="number"
          />
        </div>
        <div data-area="voteRank">
          <FormInputField
            entry={entry}
            label="人気順位"
            name="voteRank"
            onChange={onValueChange2}
            type="number"
          />
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
          <Label>特別</Label>
          <Checkbox
            isSelected={entry.spGolshiChanMode2020}
            name="spGolshiChanMode2020"
            onChange={onSpGolshiChanMode2020Change}
          >
            ゴルシちゃんモード (2020)
          </Checkbox>
        </div>
        <div data-area="submit">
          <ActionButton width="100%">OK</ActionButton>
        </div>
      </div>
    </Form>
  );
};

interface FormInputFieldExtendedProps {
  name: keyof RaceEntry;
  entry: RaceEntry;
  label?: string;
  onChange: (name: keyof RaceEntry, value: string) => void;
}

const FormInputField: React.FC<
  Omit<Parameters<typeof TextField>[0], keyof FormInputFieldExtendedProps> &
    FormInputFieldExtendedProps
> = ({ entry, name, onChange, ...props }) => {
  const onInputChange = (value: string) => {
    onChange(name, value);
  };

  return (
    <TextField
      isRequired
      onChange={onInputChange}
      value={String(entry[name])}
      width="100%"
      {...props}
    />
  );
};
