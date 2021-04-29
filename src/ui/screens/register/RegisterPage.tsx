import { useState } from "react";
import { useLoggedIn } from "../../../data/CurrentUserContext";
import { createRaceEntry, RaceEntryCallback } from "../../../data/RaceEntry";
import { rootPath } from "../../../misc";
import { BasicLayout } from "../basicLayout/BasicLayout";
import { RaceEntryForm } from "../home/RaceEntryForm";
import { LoginScreen } from "../misc/LoginScreen";

export function registerPagePath(): string {
  return `${rootPath()}register`;
}

export const RegisterPage: React.FC = () => {
  const loggedIn = useLoggedIn();
  const [entry, setEntry] = useState(createRaceEntry());

  const onNewFormChange: RaceEntryCallback = (newEntry) => {
    setEntry(newEntry);
  };

  const onNewFormSubmit: RaceEntryCallback = () => {
    console.log("# entry", entry);
  };

  if (!loggedIn) {
    return <LoginScreen />;
  }

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
