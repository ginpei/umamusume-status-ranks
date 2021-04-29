import { useState } from "react";
import { useLoggedIn } from "../../../data/CurrentUserContext";
import { createRaceEntry, RaceEntryCallback } from "../../../data/RaceEntry";
import { saveRaceEntry } from "../../../data/RaceEntryDb";
import { db, isFirebaseError } from "../../../gp-firebase/firebase";
import { getErrorMessage, rootPath } from "../../../misc";
import { BasicLayout } from "../basicLayout/BasicLayout";
import { RaceEntryForm } from "../home/RaceEntryForm";
import { LoginFormWithMessage } from "../login/LoginForm";

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
  const [errorMessage, setErrorMessage] = useState("");

  const onNewFormChange: RaceEntryCallback = (newEntry) => {
    setEntry(newEntry);
  };

  const onNewFormSubmit: RaceEntryCallback = async () => {
    try {
      await saveRaceEntry(db, entry);
      setEntry(createRaceEntry());
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
    }
  };

  return (
    <>
      {errorMessage && <p>{errorMessage}</p>}
      <RaceEntryForm
        entry={entry}
        onChange={onNewFormChange}
        onSubmit={onNewFormSubmit}
      />
    </>
  );
};
