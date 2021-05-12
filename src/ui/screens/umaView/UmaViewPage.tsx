import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { Race, races } from "../../../data/Race";
import { BasicLayout } from "../basicLayout/BasicLayout";
import { raceViewPagePath } from "../raceView/RaceViewPage";
import { umaListPagePath } from "../umaList/UmaListPage";

export function umaViewPagePath(umaName: string): string {
  return `${umaListPagePath()}${umaName}/`;
}

export const UmaViewPage: React.FC = () => {
  const { umaName } = useParams<{ umaName: string }>();

  const umaRaces = useMemo(() => {
    return races.filter((v) => v.umaNames.includes(umaName));
  }, [umaName]);

  return (
    <BasicLayout title={umaName}>
      <h1>{umaName}</h1>
      <table>
        <thead>
          <tr>
            <th>級</th>
            <th>月</th>
            <th>レース</th>
          </tr>
        </thead>
        <tbody>
          {umaRaces.map((race) => (
            <RaceRow key={`${race.umaClass}${race.title}`} race={race} />
          ))}
        </tbody>
      </table>
    </BasicLayout>
  );
};

const RaceRow: React.FC<{ race: Race }> = ({ race }) => {
  return (
    <tr className="RaceRow">
      <td>{race.umaClass}</td>
      <td>
        {race.month}月 {race.ofMonth}
      </td>
      <td>
        <Link to={raceViewPagePath(race.title)}>{race.title}</Link>
      </td>
    </tr>
  );
};
