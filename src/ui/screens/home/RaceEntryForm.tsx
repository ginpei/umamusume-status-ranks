import { ActionButton } from "@react-spectrum/button";
import { Form } from "@react-spectrum/form";
import { TextField } from "@react-spectrum/textfield";
import { FormEventHandler } from "react";
import styled from "styled-components";
import { raceTitles, umaClasses } from "../../../data/Race";
import {
  ExpectationLevel,
  ExpectationList,
  RaceEntry,
  RaceEntryCallback,
} from "../../../data/RaceEntry";
import { NiceListBox, NiceListBoxOption } from "../../stateful/NiceListBox";
import { TextListField } from "../../stateful/TextListField";
import { ExpectationListBox } from "./ExpectationListBox";
import { StatusRankListBox } from "./StatusRankListBox";

const umaClassOptions: NiceListBoxOption[] = umaClasses.map((v) => ({
  name: v,
  value: v,
}));

export const RaceEntryForm: React.FC<{
  disabled: boolean;
  entry: RaceEntry;
  onChange: RaceEntryCallback;
  onSubmit: RaceEntryCallback;
  submitLabel: string;
}> = ({ disabled, entry, onChange, onSubmit, submitLabel }) => {
  const onValueChange = (name: keyof RaceEntry, value: string | undefined) => {
    if (value === undefined) {
      return;
    }

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

  const onExpectationChange = (name: string, level: ExpectationLevel) => {
    const expectations: ExpectationList = [...entry.expectations];
    if (name === "expectation1") {
      expectations[0] = level;
    } else if (name === "expectation2") {
      expectations[1] = level;
    } else if (name === "expectation3") {
      expectations[2] = level;
    } else {
      throw new Error(`Unknown name "${name}"`);
    }

    onChange({ ...entry, expectations });
  };

  // const onSpGolshiChanMode2020Change = (checked: boolean) => {
  //   onChange({ ...entry, spGolshiChanMode2021: checked });
  // };

  const onFormSubmit: FormEventHandler = (event) => {
    event.preventDefault();
    onSubmit(entry);
  };

  return (
    <Form isDisabled={disabled} onSubmit={onFormSubmit}>
      <Frame>
        <div data-area="umaName">
          <FormInputField
            entry={entry}
            label="ウマ娘"
            name="umaName"
            onChange={onValueChange}
          />
        </div>
        <div data-area="umaClass">
          <NiceListBox
            disabled={disabled}
            direction="horizontal"
            label="級"
            onChange={(v) => onValueChange("umaClass", v)}
            options={umaClassOptions}
            value={entry.umaClass}
          />
        </div>
        <div data-area="raceTitle">
          <TextListField
            isRequired
            label="レース名"
            name="raceTitle"
            onChange={(v) => onValueChange("raceTitle", v)}
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
            onChange={(v) => onValueChange("tadunaComment", v)}
            options={[
              "1着争い",
              "有力",
              "上位入着",
              "平均的",
              "一発に期待",
              "距離適性が合っていない",
              "バ場適性が合っていない",
            ]}
            placeholder="1着争い, 有力, 上位入着, 平均的"
            value={entry.tadunaComment}
            width="100%"
          />
        </div>
        <div data-area="speedRank">
          <StatusRankListBox
            disabled={disabled}
            title="スピード"
            onChange={(value) => onValueChange("speedRank", value)}
            value={entry.speedRank}
          />
        </div>
        <div data-area="staminaRank">
          <StatusRankListBox
            disabled={disabled}
            title="スタミナ"
            onChange={(value) => onValueChange("staminaRank", value)}
            value={entry.staminaRank}
          />
        </div>
        <div data-area="powerRank">
          <StatusRankListBox
            disabled={disabled}
            title="パワー"
            onChange={(value) => onValueChange("powerRank", value)}
            value={entry.powerRank}
          />
        </div>
        <div data-area="gutRank">
          <StatusRankListBox
            disabled={disabled}
            title="根性"
            onChange={(value) => onValueChange("gutRank", value)}
            value={entry.gutRank}
          />
        </div>
        <div data-area="intelligenceRank">
          <StatusRankListBox
            disabled={disabled}
            title="賢さ"
            onChange={(value) => onValueChange("intelligenceRank", value)}
            value={entry.intelligenceRank}
          />
        </div>
        <div data-area="speedStatus">
          <FormInputField
            aria-label="スピード"
            entry={entry}
            name="speedStatus"
            onChange={onValueChange}
            type="number"
          />
        </div>
        <div data-area="staminaStatus">
          <FormInputField
            aria-label="スタミナ"
            entry={entry}
            name="staminaStatus"
            onChange={onValueChange}
            type="number"
          />
        </div>
        <div data-area="powerStatus">
          <FormInputField
            aria-label="パワー"
            entry={entry}
            name="powerStatus"
            onChange={onValueChange}
            type="number"
          />
        </div>
        <div data-area="gutStatus">
          <FormInputField
            aria-label="根性"
            entry={entry}
            name="gutStatus"
            onChange={onValueChange}
            type="number"
          />
        </div>
        <div data-area="intelligenceStatus">
          <FormInputField
            aria-label="賢さ"
            entry={entry}
            name="intelligenceStatus"
            onChange={onValueChange}
            type="number"
          />
        </div>
        <div data-area="voteRank">
          <FormInputField
            entry={entry}
            label="人気順位"
            name="voteRank"
            onChange={onValueChange}
            type="number"
          />
        </div>
        <div data-area="expectation1">
          <ExpectationListBox
            disabled={disabled}
            title="予想1"
            onChange={(v) => onExpectationChange("expectation1", v)}
            value={entry.expectations[0]}
          />
        </div>
        <div data-area="expectation2">
          <ExpectationListBox
            disabled={disabled}
            title="予想2"
            onChange={(v) => onExpectationChange("expectation2", v)}
            value={entry.expectations[1]}
          />
        </div>
        <div data-area="expectation3">
          <ExpectationListBox
            disabled={disabled}
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
            onChange={(v) => onValueChange("commentatorComment", v)}
            options={[
              "実力は完全に上位",
              "素質は負けていません",
              "引けを取りません",
              "人気と実力",
              "逆転を狙える",
              "いい感じに気合が",
              "これ以上ない仕上がり",
              "素晴らしい仕上がり",
              "好走を期待",
              "健闘を期待",
            ]}
            placeholder="完全に上位, 素質は負けていません, 引けを取りません"
            value={entry.commentatorComment}
            width="100%"
          />
        </div>
        {/* <div data-area="special">
          <Label>特別</Label>
          <Checkbox
            isSelected={entry.spGolshiChanMode2021}
            name="spGolshiChanMode2020"
            onChange={onSpGolshiChanMode2020Change}
          >
            ゴルシちゃんモード (2021)
          </Checkbox>
        </div> */}
        {submitLabel && (
          <div data-area="submit">
            <ActionButton type="submit" width="100%">
              {submitLabel}
            </ActionButton>
          </div>
        )}
      </Frame>
    </Form>
  );
};

const Frame = styled.div`
  display: grid;
  gap: 1em 0.5em;
  grid-template:
    "umaName       umaName       umaName       umaName       umaName         "
    "umaClass      umaClass      umaClass      umaClass      umaClass        "
    "raceTitle     raceTitle     raceTitle     raceTitle     raceTitle       "
    "tadunaComment tadunaComment tadunaComment tadunaComment tadunaComment   "
    "speedRank     staminaRank   powerRank     gutRank       intelligenceRank"
    "speedStatus   staminaStatus powerStatus   gutStatus     intelligenceStatus"
    "voteRank      voteRank      expectation1  expectation2  expectation3    "
    "commentatorComment commentatorComment commentatorComment commentatorComment commentatorComment   "
    "special       special       special       special       special         "
    "submit        submit        submit        submit        submit          "
    / 1fr 1fr 1fr 1fr 1fr;

  & > [data-area="umaName"] {
    grid-area: umaName;
  }
  & > [data-area="umaClass"] {
    grid-area: umaClass;
  }

  & > [data-area="raceTitle"] {
    grid-area: raceTitle;
  }

  & > [data-area="tadunaComment"] {
    grid-area: tadunaComment;
  }

  & > [data-area="speedRank"] {
    grid-area: speedRank;
  }
  & > [data-area="staminaRank"] {
    grid-area: staminaRank;
  }
  & > [data-area="powerRank"] {
    grid-area: powerRank;
  }
  & > [data-area="gutRank"] {
    grid-area: gutRank;
  }
  & > [data-area="intelligenceRank"] {
    grid-area: intelligenceRank;
  }

  & > [data-area="speedStatus"] {
    grid-area: speedStatus;
  }
  & > [data-area="staminaStatus"] {
    grid-area: staminaStatus;
  }
  & > [data-area="powerStatus"] {
    grid-area: powerStatus;
  }
  & > [data-area="gutStatus"] {
    grid-area: gutStatus;
  }
  & > [data-area="intelligenceStatus"] {
    grid-area: intelligenceStatus;
  }

  & > [data-area="voteRank"] {
    grid-area: voteRank;
  }
  & > [data-area="expectation1"] {
    grid-area: expectation1;
  }
  & > [data-area="expectation2"] {
    grid-area: expectation2;
  }
  & > [data-area="expectation3"] {
    grid-area: expectation3;
  }

  & > [data-area="commentatorComment"] {
    grid-area: commentatorComment;
  }
  & > [data-area="special"] {
    grid-area: special;
  }
  & > [data-area="submit"] {
    grid-area: submit;
  }
`;

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
