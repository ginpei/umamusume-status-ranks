import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { RaceEntry } from "../../../data/RaceEntry";
import { useRaceEntriesByTitle } from "../../../data/raceEntryHook";
import { db } from "../../../gp-firebase/firebase";
import { BasicLayout } from "../basicLayout/BasicLayout";
import { entryListPagePath } from "../entryList/EntryListPage";
import { raceListPagePath } from "../raceList/RaceListPage";
import { registerPagePath } from "../register/RegisterPage";

export function raceViewPagePath(raceTitle: string): string {
  return `${raceListPagePath()}${raceTitle}/`;
}

export const RaceViewPage: React.FC = () => {
  const { raceTitle } = useParams<{ raceTitle: string }>();
  const entries = useRaceEntriesByTitle(db, raceTitle);

  const title = `${raceTitle}`;

  return (
    <BasicLayout title={title}>
      <h1>{title}</h1>
      <p>
        <Link to={entryListPagePath(raceTitle)}>登録済みのもの一覧</Link>
        {" | "}
        <Link to={registerPagePath()}>追加</Link>
      </p>
      {entries && <RaceViewPageContent entries={entries} />}
    </BasicLayout>
  );
};

const RaceViewPageContent: React.FC<{ entries: RaceEntry[] }> = ({
  entries,
}) => {
  return (
    <ul>
      {entries.map((entry) => (
        <li key={entry.id}>{entry.speedRank}</li>
      ))}
    </ul>
  );
};
