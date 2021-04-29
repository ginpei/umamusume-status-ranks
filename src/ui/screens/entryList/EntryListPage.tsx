import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { isValidRaceTitle, races } from "../../../data/Race";
import { rootPath } from "../../../misc";
import { BasicLayout } from "../basicLayout/BasicLayout";
import { NotFoundScreen } from "../misc/NotFoundScreen";
import { raceListPagePath } from "../raceList/RaceListPage";

export function entryListPagePath(raceName: string): string {
  return `${rootPath()}entries/${raceName}/`;
}

export const EntryListPage: React.FC = () => {
  const { raceTitle } = useParams<{ raceTitle: string }>();

  const title = `${raceTitle} - 出走記録一覧`;

  if (!isValidRaceTitle(raceTitle)) {
    return <NotFoundScreen />;
  }

  return (
    <BasicLayout title={title}>
      <p>
        <Link to={raceListPagePath()}>⬅️ レース一覧</Link>
      </p>
      <h1>{title}</h1>
    </BasicLayout>
  );
};
