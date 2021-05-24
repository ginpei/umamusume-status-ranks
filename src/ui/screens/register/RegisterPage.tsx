import { useState } from "react";
import { useCurrentUser, useLoggedIn } from "../../../data/CurrentUserContext";
import { isUmaClass, UmaClass } from "../../../data/Race";
import {
  createRaceEntry,
  RaceEntry,
  RaceEntryCallback,
} from "../../../data/RaceEntry";
import { saveRaceEntry } from "../../../data/RaceEntryDb";
import { db } from "../../../gp-firebase/firebase";
import { getErrorMessage, rootPath } from "../../../misc";
import { useQuery } from "../../../misc/useQuery";
import { BasicLayout } from "../basicLayout/BasicLayout";
import { RaceEntryForm } from "../home/RaceEntryForm";
import { LoginFormWithMessage } from "../login/LoginForm";

export function registerPagePath(): string {
  return `${rootPath()}register/`;
}

export function registerPagePathWithQuery({
  raceTitle,
  umaName,
  umaClass,
}: {
  raceTitle?: string;
  umaName?: string;
  umaClass?: UmaClass;
}): string {
  const params = new URLSearchParams();
  if (umaName) {
    params.set("uma", umaName);
  }
  if (umaClass) {
    params.set("grade", umaClass);
  }
  if (raceTitle) {
    params.set("title", raceTitle);
  }

  return `${registerPagePath()}?${params.toString()}`;
}

export const RegisterPage: React.FC = () => {
  const loggedIn = useLoggedIn();
  const defaultRaceEntry = useDefaultRaceEntry();

  return (
    <BasicLayout title="出走記録追加">
      <h1>出走記録追加</h1>
      {loggedIn ? (
        <RegisterPageContent defaultRaceEntry={defaultRaceEntry} />
      ) : (
        <LoginFormWithMessage />
      )}
    </BasicLayout>
  );
};

const RegisterPageContent: React.FC<{
  defaultRaceEntry: Partial<RaceEntry>;
}> = ({ defaultRaceEntry }) => {
  const user = useCurrentUser();
  const [entry, setEntry] = useState(createRaceEntry(defaultRaceEntry));
  const [errorMessage, setErrorMessage] = useState("");
  const [working, setWorking] = useState(false);

  const onNewFormChange: RaceEntryCallback = (newEntry) => {
    setEntry(newEntry);
  };

  const onNewFormSubmit: RaceEntryCallback = async () => {
    try {
      setWorking(true);

      await saveRaceEntry(db, { ...entry, userId: user.id });

      setEntry(
        createRaceEntry({
          spGolshiChanMode2021: entry.spGolshiChanMode2021,
          umaClass: entry.umaClass,
          umaName: entry.umaName,
        })
      );
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

function useDefaultRaceEntry(): Partial<RaceEntry> {
  const query = useQuery();

  const grade = query.get("grade");
  const defaultEntry: Partial<RaceEntry> = {
    raceTitle: query.get("title") ?? undefined,
    umaName: query.get("uma") ?? undefined,
    umaClass: isUmaClass(grade) ? grade : undefined,
  };
  return defaultEntry;
}
