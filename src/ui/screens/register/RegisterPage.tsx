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
    <BasicLayout title="出走記録追加">
      <h1>出走記録追加</h1>
      {loggedIn ? <RegisterPageContent /> : <LoginFormWithMessage />}
    </BasicLayout>
  );
};

const RegisterPageContent: React.FC = () => {
  const [entry, setEntry] = useState(createRaceEntry());
  const [errorMessage, setErrorMessage] = useState("");
  const [working, setWorking] = useState(false);

  const onNewFormChange: RaceEntryCallback = (newEntry) => {
    setEntry(newEntry);
  };

  const onNewFormSubmit: RaceEntryCallback = async () => {
    try {
      setWorking(true);
      await saveRaceEntry(db, entry);
      setEntry(createRaceEntry());
      setWorking(false);
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
    }
  };

  return (
    <>
      {errorMessage && <p>{errorMessage}</p>}
      <RaceEntryForm
        disabled={working}
        entry={entry}
        onChange={onNewFormChange}
        onSubmit={onNewFormSubmit}
      />
    </>
  );
};
