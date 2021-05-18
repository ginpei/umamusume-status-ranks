import { ActionButton } from "@react-spectrum/button";
import { Checkbox } from "@react-spectrum/checkbox";
import { Form } from "@react-spectrum/form";
import { Label } from "@react-spectrum/label";
import { Item, Section } from "@react-spectrum/listbox";
import { TextField } from "@react-spectrum/textfield";
import { ChangeEventHandler, FormEventHandler } from "react";
import { isUmaClass, raceTitles, umaClasses } from "../../../data/Race";
import {
  ExpectationLevel,
  ExpectationLevelCallback,
  expectationLevels,
  ExpectationList,
  expectationToSymbol,
  isExpectationLevel,
  isTadunaRank,
  RaceEntry,
  RaceEntryCallback,
  TadunaRank,
  TadunaRankCallback,
  tadunaRanks,
  tadunaRankToSymbol,
} from "../../../data/RaceEntry";
import { GpCheckboxChangeHandler } from "../../../gp/components/stable/GpCheckbox";
import { SingleListBox } from "../../stable/SingleListBox";
import { TextListField } from "../../stateful/TextListField";
import { OnExpectationRadioChange } from "./ExpectationSelect";
import styles from "./RaceEntryForm.module.scss";
import { OnStatusRankRadioChange } from "./StatusRankSelect";

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

  const onUmaClassChange = (umaClass: string) => {
    if (!isUmaClass(umaClass)) {
      throw new Error(`Unknown uma class: ${umaClass}`);
    }

    const updated: RaceEntry = {
      ...entry,
      umaClass,
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
          <SingleListBox
            aria-label="級"
            onSelectionChange={(value) => onUmaClassChange(value)}
            selectedKey={entry.umaClass}
            width="100%"
          >
            <Section title="級">
              {umaClasses.map((name) => (
                <Item key={name}>{name}</Item>
              ))}
            </Section>
          </SingleListBox>
        </div>
        <div data-area="raceTitle">
          <TextListField
            isRequired
            label="レース名"
            name="raceTitle"
            onChange={(v) => onValueChange2("raceTitle", v)}
            options={raceTitles}
            value={entry.raceTitle}
            width="100%"
          />
        </div>
        <div data-area="tadunaComment">
          <TextListField
            isRequired
            label="たづなさん評価"
            name="tadunaComment"
            onChange={(v) => onValueChange2("tadunaComment", v)}
            options={["1着争い", "有力", "上位入着", "平均的"]}
            placeholder="1着争い, 有力, 上位入着, 平均的"
            value={entry.tadunaComment}
            width="100%"
          />
        </div>
        <div data-area="speedRank">
          <StatusRankListBox
            title="スピード"
            onChange={(value) => onValueChange2("speedRank", value)}
            value={entry.speedRank}
          />
        </div>
        <div data-area="staminaRank">
          <StatusRankListBox
            title="スタミナ"
            onChange={(value) => onValueChange2("staminaRank", value)}
            value={entry.staminaRank}
          />
        </div>
        <div data-area="powerRank">
          <StatusRankListBox
            title="パワー"
            onChange={(value) => onValueChange2("powerRank", value)}
            value={entry.powerRank}
          />
        </div>
        <div data-area="gutRank">
          <StatusRankListBox
            title="根性"
            onChange={(value) => onValueChange2("gutRank", value)}
            value={entry.gutRank}
          />
        </div>
        <div data-area="intelligenceRank">
          <StatusRankListBox
            title="賢さ"
            onChange={(value) => onValueChange2("intelligenceRank", value)}
            value={entry.intelligenceRank}
          />
        </div>
        <div data-area="speedStatus">
          <FormInputField
            aria-label="スピード"
            entry={entry}
            name="speedStatus"
            onChange={onValueChange2}
            type="number"
          />
        </div>
        <div data-area="staminaStatus">
          <FormInputField
            aria-label="スタミナ"
            entry={entry}
            name="staminaStatus"
            onChange={onValueChange2}
            type="number"
          />
        </div>
        <div data-area="powerStatus">
          <FormInputField
            aria-label="パワー"
            entry={entry}
            name="powerStatus"
            onChange={onValueChange2}
            type="number"
          />
        </div>
        <div data-area="gutStatus">
          <FormInputField
            aria-label="根性"
            entry={entry}
            name="gutStatus"
            onChange={onValueChange2}
            type="number"
          />
        </div>
        <div data-area="intelligenceStatus">
          <FormInputField
            aria-label="賢さ"
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
          <ExpectationListBox
            title="予想1"
            onChange={(v) => onExpectationChange("expectation1", v)}
            value={entry.expectations[0]}
          />
        </div>
        <div data-area="expectation2">
          <ExpectationListBox
            title="予想2"
            onChange={(v) => onExpectationChange("expectation2", v)}
            value={entry.expectations[1]}
          />
        </div>
        <div data-area="expectation3">
          <ExpectationListBox
            title="予想3"
            onChange={(v) => onExpectationChange("expectation3", v)}
            value={entry.expectations[2]}
          />
        </div>
        <div data-area="commentatorComment">
          <TextListField
            isRequired
            label="解説評価"
            name="commentatorComment"
            onChange={(v) => onValueChange2("commentatorComment", v)}
            options={[
              "実力は完全に上位",
              "素質は負けていません",
              "引けを取りません",
              "逆転を狙える",
              "これ以上ない仕上がり",
            ]}
            placeholder="完全に上位, 素質は負けていません, 引けを取りません"
            value={entry.commentatorComment}
            width="100%"
          />
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

const StatusRankListBox: React.FC<{
  title: string;
  onChange: TadunaRankCallback;
  value: TadunaRank;
}> = ({ title, onChange, value }) => {
  const onSelectionChange = (rank: string) => {
    if (!isTadunaRank(rank)) {
      throw new Error(`Unknown taduna rank value: ${rank}`);
    }

    onChange(rank);
  };

  return (
    <SingleListBox
      aria-label={title}
      onSelectionChange={(v) => onSelectionChange(v)}
      selectedKey={value}
      width="100%"
    >
      <Section title={title}>
        {tadunaRanks.map((rank) => (
          <Item key={rank}>{tadunaRankToSymbol(rank)}</Item>
        ))}
      </Section>
    </SingleListBox>
  );
};

const ExpectationListBox: React.FC<{
  title: string;
  onChange: ExpectationLevelCallback;
  value: ExpectationLevel;
}> = ({ title, onChange, value }) => {
  const onSelectionChange = (level: string) => {
    if (!isExpectationLevel(level)) {
      throw new Error(`Unknown expectation level: ${level}`);
    }

    onChange(level);
  };

  return (
    <SingleListBox
      aria-label={title}
      onSelectionChange={(v) => onSelectionChange(v)}
      selectedKey={value}
      width="100%"
    >
      <Section title={title}>
        {expectationLevels.map((level) => (
          <Item key={level}>{expectationToSymbol(level)}</Item>
        ))}
      </Section>
    </SingleListBox>
  );
};

interface FormInputFieldExtendedProps {
  name: keyof RaceEntry;
  entry: RaceEntry;
  label?: string;
  onChange: (name: keyof RaceEntry, value: string) => void;
}

// TODO replace with individual code
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
