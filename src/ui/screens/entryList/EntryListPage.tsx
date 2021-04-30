import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { isValidRaceTitle } from "../../../data/Race";
import { BasicLayout } from "../basicLayout/BasicLayout";
import { NotFoundScreen } from "../misc/NotFoundScreen";
import { raceViewPagePath } from "../raceView/RaceViewPage";

export function entryListPagePath(raceName: string): string {
  return `${raceViewPagePath(raceName)}entries/`;
}

export const EntryListPage: React.FC = () => {
  const { raceTitle } = useParams<{ raceTitle: string }>();

  if (!isValidRaceTitle(raceTitle)) {
    return <NotFoundScreen />;
  }

  return (
    <BasicLayout title={`出走記録一覧 - ${raceTitle}`}>
      <p>
        <Link to={raceViewPagePath(raceTitle)}>⬅️ {raceTitle}</Link>
      </p>
      <h1>出走記録一覧</h1>
    </BasicLayout>
  );
};
