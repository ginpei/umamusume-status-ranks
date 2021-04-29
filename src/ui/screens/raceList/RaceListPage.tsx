import { useState } from "react";
import { Link } from "react-router-dom";
import { rootPath } from "../../../misc";
import { BasicLayout } from "../basicLayout/BasicLayout";

// TODO
const dummyRaceTitles = [
  "ホープフルステークス",
  "中京ジュニアステークス",
  "有馬記念",
  "桜花賞",
  "菊花賞",
];

export function raceListPagePath(): string {
  return `${rootPath()}races`;
}

export const RaceListPage: React.FC = () => {
  const [raceTitles] = useState(dummyRaceTitles);

  return (
    <BasicLayout>
      <h1>レース一覧</h1>
      <ul>
        {raceTitles.map((title) => (
          <li key={title}>
            <Link to={`#${title}`}>{title}</Link>
          </li>
        ))}
      </ul>
    </BasicLayout>
  );
};
