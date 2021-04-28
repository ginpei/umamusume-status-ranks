import { useState } from "react";
import {
  createRaceEntry,
  RaceEntry,
  RaceEntryCallback,
} from "../../../data/RaceEntry";
import { RaceEntryForm } from "./RaceEntryForm";
import { RaceEntryList } from "./RaceEntryList";

const entries: RaceEntry[] = [
  createRaceEntry({
    id: "dummy-1",
    raceTitle: "有馬記念",
    tadunaComment: "平均的",
    speedRank: "great",
    speedStatus: 664,
    staminaRank: "great",
    staminaStatus: 701,
    powerRank: "poor",
    powerStatus: 353,
    gutRank: "poor",
    gutStatus: 336,
    intelligenceRank: "poor",
    intelligenceStatus: 433,
    voteRank: 5,
    expectations: ["maybe", "possibly", "none"],
    commentatorComment: "これ以上ない仕上がり",
  }),
  createRaceEntry({
    id: "dummy-2",
    raceTitle: "ジャパンカップ",
    tadunaComment: "有力",
    speedRank: "great",
    staminaRank: "great",
    powerRank: "poor",
    gutRank: "ok",
    intelligenceRank: "good",
    speedStatus: 656,
    staminaStatus: 701,
    powerStatus: 353,
    gutStatus: 336,
    intelligenceStatus: 443,
    voteRank: 2,
    expectations: ["great", "great", "maybe"],
    commentatorComment: "素質は負けていません",
  }),
];

export const HomePage: React.FC = () => {
  const onNewFormSubmit: RaceEntryCallback = (entry) => {
    console.log("# entry", entry);
  };

  return (
    <div className="HomePage u-container">
      <h1>HomePage</h1>
      <details>
        <summary>追加</summary>
        <NewRaceEntryForm onSubmit={onNewFormSubmit} />
      </details>
      <RaceEntryList entries={entries} />
    </div>
  );
};

const NewRaceEntryForm: React.FC<{
  onSubmit: RaceEntryCallback;
}> = ({ onSubmit }) => {
  const [entry, setEntry] = useState(createRaceEntry());

  const onChange: RaceEntryCallback = (newEntry) => {
    setEntry(newEntry);
  };

  return (
    <RaceEntryForm entry={entry} onChange={onChange} onSubmit={onSubmit} />
  );
};
