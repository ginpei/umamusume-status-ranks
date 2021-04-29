import { useState } from "react";
import { createRaceEntry, RaceEntryCallback } from "../../../data/RaceEntry";
import { rootPath } from "../../../misc";
import { BasicLayout } from "../basicLayout/BasicLayout";
import { RaceEntryForm } from "../home/RaceEntryForm";

export function registerPagePath(): string {
  return `${rootPath()}register`;
}

export const RegisterPage: React.FC = () => {
  const [entry, setEntry] = useState(createRaceEntry());

  const onNewFormChange: RaceEntryCallback = (newEntry) => {
    setEntry(newEntry);
  };

  const onNewFormSubmit: RaceEntryCallback = () => {
    console.log("# entry", entry);
  };

  return (
    <BasicLayout>
      <h1>追加</h1>
      <RaceEntryForm
        entry={entry}
        onChange={onNewFormChange}
        onSubmit={onNewFormSubmit}
      />
    </BasicLayout>
  );
};
