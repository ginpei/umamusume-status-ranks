import { Link } from "react-router-dom";
import { umaNames } from "../../../data/Race";
import { rootPath } from "../../../misc";
import { BasicLayout } from "../basicLayout/BasicLayout";
import { raceViewPagePath } from "../raceView/RaceViewPage";

export function umaListPagePath(): string {
  return `${rootPath()}uma/`;
}

export const UmaListPage: React.FC = () => {
  return (
    <BasicLayout title="ウマ娘一覧">
      <h1>ウマ娘一覧</h1>
      <ul>
        {umaNames.map((umaName) => (
          <li key={umaName}>
            {/* TODO */}
            <Link to={raceViewPagePath(umaName)}>{umaName}</Link>
          </li>
        ))}
      </ul>
    </BasicLayout>
  );
};
