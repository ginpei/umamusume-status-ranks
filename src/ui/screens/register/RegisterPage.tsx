import { useState } from "react";
import { useLoggedIn } from "../../../data/CurrentUserContext";
import { createRaceEntry, RaceEntryCallback } from "../../../data/RaceEntry";
import { rootPath } from "../../../misc";
import { BasicLayout } from "../basicLayout/BasicLayout";
import { RaceEntryForm } from "../home/RaceEntryForm";
import { LoginForm, LoginFormWithMessage } from "../login/LoginForm";

export function registerPagePath(): string {
  return `${rootPath()}register`;
}

export const RegisterPage: React.FC = () => {
  const loggedIn = useLoggedIn();

  return (
    <BasicLayout>
      <h1>追加</h1>
      {loggedIn ? <RegisterPageContent /> : <LoginFormWithMessage />}
    </BasicLayout>
  );
};

const RegisterPageContent: React.FC = () => {
  const [entry, setEntry] = useState(createRaceEntry());

  const onNewFormChange: RaceEntryCallback = (newEntry) => {
    setEntry(newEntry);
  };

  const onNewFormSubmit: RaceEntryCallback = () => {
    console.log("# entry", entry);
  };

  return (
    <RaceEntryForm
      entry={entry}
      onChange={onNewFormChange}
      onSubmit={onNewFormSubmit}
    />
  );
};
