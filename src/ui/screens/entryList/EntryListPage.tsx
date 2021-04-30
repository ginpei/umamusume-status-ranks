import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { isValidRaceTitle } from "../../../data/Race";
import { RaceEntry } from "../../../data/RaceEntry";
import { fetchRecentRaceEntries } from "../../../data/RaceEntryDb";
import { db } from "../../../gp-firebase/firebase";
import { printError } from "../../../misc";
import { BasicLayout } from "../basicLayout/BasicLayout";
import { RaceEntryList } from "./RaceEntryList";
import { NotFoundScreen } from "../misc/NotFoundScreen";
import { raceViewPagePath } from "../raceView/RaceViewPage";

export function entryListPagePath(raceName: string): string {
  return `${raceViewPagePath(raceName)}entries/`;
}

export const EntryListPage: React.FC = () => {
  const { raceTitle } = useParams<{ raceTitle: string }>();
  const [entries, setEntries] = useState<RaceEntry[] | null>(null);

  useEffect(() => {
    fetchRecentRaceEntries(db, raceTitle)
      .then((v) => setEntries(v))
      .catch((error) => printError(error));
  }, [raceTitle]);

  if (!isValidRaceTitle(raceTitle)) {
    return <NotFoundScreen />;
  }

  return (
    <BasicLayout title={`出走記録一覧 - ${raceTitle}`}>
      <p>
        <Link to={raceViewPagePath(raceTitle)}>⬅️ {raceTitle}</Link>
      </p>
      <h1>出走記録一覧</h1>
      {entries && <RaceEntryList entries={entries} />}
    </BasicLayout>
  );
};
