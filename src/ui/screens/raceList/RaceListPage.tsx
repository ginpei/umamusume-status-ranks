import { Link } from "react-router-dom";
import { raceTitles } from "../../../data/Race";
import { rootPath } from "../../../misc";
import { BasicLayout } from "../basicLayout/BasicLayout";
import { raceViewPagePath } from "../raceView/RaceViewPage";

export function raceListPagePath(): string {
  return `${rootPath()}races/`;
}

export const RaceListPage: React.FC = () => {
  return (
    <BasicLayout title="レース一覧">
      <h1>レース一覧</h1>
      <ul>
        {raceTitles.map((title) => (
          <li key={title}>
            <Link to={raceViewPagePath(title)}>{title}</Link>
          </li>
        ))}
      </ul>
    </BasicLayout>
  );
};
